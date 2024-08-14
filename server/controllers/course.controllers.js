import Subject from '../models/mongoDB/schemas/college/Subject.js'
import Course from '../models/mongoDB/schemas/college/Course.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

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

export const getUserCourses = async (req, res) => {
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

export const joinCourseByCode = async (req, res) => {
  const { courseCode } = req.query
  const decoded = jwt.decode(req.cookies.token)
  const { id: studentId } = decoded

  try {
    const foundCourse = await Course.findOne({ code: courseCode })

    if (!foundCourse)
      return res
        .status(404)
        .json({ message: 'Código no valido. Curso no encontrado' })

    const isAllReadyEnrolled = foundCourse.students.includes(studentId)

    if (isAllReadyEnrolled)
      return res.status(400).json({ message: 'Ya está inscripto al curso' })

    foundCourse.students.push(studentId)
    const course = [await foundCourse.save()]

    const courseInformation = await setCourseInformation(course)

    res.status(200).json({
      message: 'Alumno inscripto exitosamente',
      course: courseInformation,
    })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al encontrar curso', error: err.message })
  }
}
