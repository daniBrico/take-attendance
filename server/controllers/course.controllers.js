import Student from '../models/mongoDB/schemas/auth/Student.js'
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

export const createCourse = async (req, res) => {
  const { subjectId } = req.body
  const decoded = jwt.decode(req.cookies.token)
  const { id: professorId } = decoded

  try {
    const newCourse = new Course({
      subject: subjectId,
      professor: professorId,
    })

    console.log(newCourse)

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

    const courseInformation = []

    for (let course of foundCourses) {
      const subject = await Subject.findById(course.subject)

      // Me falta pasar los días de cursada

      courseInformation.push({
        id: course._id,
        name: subject.name,
        code: subject.code,
        numberOfStudents: course.students.length,
      })
    }

    res.status(200).json({
      message: 'Cursos encontrados exitosamente',
      courses: courseInformation,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
