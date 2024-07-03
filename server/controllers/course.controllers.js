import Student from '../models/mongoDB/schemas/auth/Student.js'
import Course from '../models/mongoDB/schemas/college/Course.js'

export const createCourse = async (req, res) => {
  const { subjectId, professorId } = req.body

  // Los estudiantes deben enviarse también como parámetros. Por momento, se van a tomar todos los alumnos registrados en la aplicación
  // El schedule debe enviarse como parámetro. Por el momento el horario y fecha va a estar establecido por defecto. O evitado.

  try {
    const students = await Student.find({}, '_id')

    // console.log(students)

    const newCourse = new Course({
      subject: subjectId,
      professor: professorId,
      students,
    })

    await newCourse.save()

    console.log(newCourse)

    res.json('Éxito')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
