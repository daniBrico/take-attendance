import Subject from '../models/mongoDB/schemas/college/Subject.js'
import Course from '../models/mongoDB/schemas/college/Course.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { getSocketIo, getUserSocketMap } from '../socket/socket.js'

const generateCourseCode = (courseId) => {
  const hash = crypto
    .createHash('md5')
    .update(courseId.toString())
    .digest('hex')

  const shortCode = hash.substring(0, 6)

  return shortCode.toUpperCase()
}

const setCourseInformation = async (courses) => {
  const courseInformation = []

  for (let course of courses) {
    const subject = await Subject.findById(course.subject)

    // Me falta pasar los días de cursada

    courseInformation.push({
      id: course._id,
      name: subject.name,
      code: subject.code,
      numberOfStudents: course.students.length,
    })
  }

  return courseInformation
}

export const createCourse = async (req, res) => {
  const { subjectId } = req.body
  const decoded = jwt.decode(req.cookies.token)
  const { id: professorId } = decoded

  try {
    const newCourse = new Course({
      subject: subjectId,
      professor: professorId,
    })

    const codeGenerated = generateCourseCode(newCourse._id)

    newCourse.code = codeGenerated

    await newCourse.save()

    res.status(201).json({ message: 'Curso creado exitosamente' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al crear el curso', error: err.message })
  }
}

export const getCourses = async (req, res) => {
  const decoded = jwt.decode(req.cookies.token)
  const { role: userType, id: userId } = decoded

  try {
    let foundCourses

    if (userType === 'student') {
      foundCourses = await Course.find({ students: userId })
    } else {
      foundCourses = await Course.find({ professor: userId })
    }

    if (foundCourses.length === 0) {
      return res.status(204).json({
        message: 'El usuario no tiene cursos registrados en la base de datos',
      })
    }

    const courseInformation = await setCourseInformation(foundCourses)

    res.status(200).json({
      message: 'Cursos encontrados exitosamente',
      courses: courseInformation,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const setNewEnrollment = async (req, res) => {
  const { courseCode } = req.query
  const decoded = jwt.decode(req.cookies.token)
  const { id: studentId } = decoded

  try {
    const foundCourse = await Course.findOne({ code: courseCode })

    if (!foundCourse)
      return res
        .status(404)
        .json({ message: 'Código no valido. Curso no encontrado' })

    const isAlreadyEnrolled = foundCourse.students.includes(studentId)

    if (isAlreadyEnrolled)
      return res.status(400).json({ message: 'Ya está inscripto al curso' })

    // Si no está inscripto, verifico si el alumno ya envío la solicitud de ingreso anteriormente
    const isRequestAlreadySent = foundCourse.enrollments.some(
      (obj) => obj.student.toString() === studentId
    )

    if (isRequestAlreadySent)
      return res.status(400).json({
        message: 'La solicitud de ingreso al curso aún está pendiente',
      })

    // Envío la notificación de ingreso al curso
    const io = getSocketIo()

    if (io) {
      const userSocketMap = getUserSocketMap()

      if (userSocketMap) {
        const professorId = foundCourse.professor.toString()

        // Verifico si el profesor se encuentra online
        if (userSocketMap.has(professorId)) {
          // Si está online envío la notificación
          const socketIdTarget = userSocketMap.get(professorId)
          io.to(socketIdTarget).emit('newEnrollment', null)
        }
      }
    }

    // De cualquier forma, guardo la solicitud de ingreso al curso en la base de datos
    const newEnrollment = {
      student: studentId,
      state: 'pendiente',
    }

    foundCourse.enrollments.push(newEnrollment)

    await foundCourse.save()

    res.status(200).json({
      message: 'Solicitud de ingreso enviada correctamente',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error al agregar una nueva inscripción',
      error: err.message,
    })
  }
}

export const getEnrollments = async (req, res) => {
  const { courseId } = req.query

  try {
    const foundCourse = await Course.findById(courseId).populate({
      path: 'enrollments.student',
      select: '_id name lastName',
    })

    if (!foundCourse)
      return res
        .status(404)
        .json({ meesage: 'Id no valido. Curso no encontrado.' })

    if (foundCourse.enrollments.length === 0)
      return res.status(204).json({
        message: 'El curso no tiene solicitudes de inscripción.',
      })

    const enrollments = foundCourse.enrollments.map((enrollment) => ({
      studentId: enrollment.student._id,
      name: enrollment.student.name,
      lastName: enrollment.student.lastName,
    }))

    res.status(200).json({
      message: 'Funciona',
      enrollments,
    })
  } catch (err) {
    console.log(err)
  }
}

export const agreeEnrollment = async (req, res) => {
  const { courseId, studentId } = req.params

  try {
    const foundCourse = await Course.findById(courseId).populate('enrollments')

    if (!foundCourse)
      return res
        .status(404)
        .json({ message: 'Id no valido. Curso no encontrado.' })

    if (foundCourse.enrollments.length === 0)
      return res
        .status(404)
        .json({ message: 'El curso no tiene solicitudes de inscripción.' })

    const foundEnrollmentIndex = foundCourse.enrollments.findIndex(
      (enrollment) => enrollment.student.toString() === studentId
    )

    if (foundEnrollmentIndex === -1)
      return res.status(404).json({
        message: 'El alumno no se encuentra en la lista de inscripción.',
      })

    const foundEnrollment = foundCourse.enrollments[foundEnrollmentIndex]

    if (!foundEnrollment.state === 'rechazada')
      return res
        .status(400)
        .json({ message: 'La inscripción ha sido rechazada con anterioridad.' })

    if (foundCourse.students.includes(studentId))
      return res
        .status(400)
        .json({ message: 'El estudiante ya se encuentra inscripto.' })

    foundCourse.students.push(studentId)
    foundCourse.enrollments.splice(foundEnrollmentIndex, 1)

    await foundCourse.save()

    res.status(200).json({ message: 'Solicitud aceptada.' })
  } catch (err) {
    res.status(500).json({
      message: 'Error al aceptar la inscripción: ',
      error: err.message,
    })
  }
}
