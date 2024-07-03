import Career from '../models/mongoDB/schemas/college/Career.js'
import Subject from '../models/mongoDB/schemas/college/Subject.js'

export const getCareersNames = async (req, res) => {
  try {
    const careersNames = await Career.find({}, 'name')

    res.json(careersNames)
  } catch (err) {
    res.staus(500).json({ message: err.mesage })
  }
}

export const getSubjectsNames = async (req, res) => {
  try {
    // Tengo que filtrar por carrera. Solo devolver las materias correspondientes a una carrera.
    const idCareer = req.query.idCareer

    const career = await Career.findById(idCareer).populate({
      path: 'subjectsByYear.subjects',
      model: 'Subject',
      select: 'name',
    })

    const subjectsNames = career.subjectsByYear.flatMap((year) => year.subjects)

    res.json(subjectsNames)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
