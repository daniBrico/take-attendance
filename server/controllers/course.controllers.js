import Student from '../models/mongoDB/schemas/auth/Student.js'
import Subject from '../models/mongoDB/schemas/college/Subject.js'
import Course from '../models/mongoDB/schemas/college/Course.js'

export const createCourse = async (req, res) => {
  const { subjectId, professorId } = req.body

  // Los estudiantes deben enviarse también como parámetros. Por momento, se van a tomar todos los alumnos registrados en la aplicación
  // El schedule debe enviarse como parámetro. Por el momento el horario y fecha va a estar establecido por defecto. O evitado.

  try {
    const students = await Student.find({}, '_id')

    const newCourse = new Course({
      subject: subjectId,
      professor: professorId,
      students,
    })

    await newCourse.save()

    res
      .status(201)
      .json({ message: 'Curso creado exitosamente', course: newCourse })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al crear el curso', error: err.message })
  }
}

export const getCourses = async (req, res) => {
  const { userType, userId } = req.query

  try {
    let foundCourses

    if (userType === 'student') {
      foundCourses = await Course.find({ students: userId })
    } else {
      foundCourses = await Course.find({ professor: userId })
    }

    if (!foundCourses || foundCourses.length === 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron cursos para este usuario' })
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
