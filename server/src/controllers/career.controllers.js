import Career from '../models/mongoDB/schemas/college/Career.js'
// import Subject from '../models/mongoDB/schemas/college/Subject.js'

export const getCareerNames = async (req, res) => {
  try {
    const careersNames = await Career.find({}, 'name')

    res.json(careersNames)
  } catch (err) {
    res.status(500).json({ message: err.mesage })
  }
}

export const getSubjectNames = async (req, res) => {
  try {
    // Tengo que filtrar por carrera. Solo devolver las materias correspondientes a una carrera.
    const idCareer = req.query.idCareer

    if (!idCareer) throw new Error('Invalid ID career')

    console.log('🚀 ~ getSubjectNames ~ idCareer: ', idCareer)

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

export const getCareerByID = async (req, res) => {
  try {
    const id = req.params.id
    console.log('🚀 ~ getCareerByID ~ id: ', id)
    const career = await Career.findById(id)
      .select('-__v')
      .populate({
        path: 'subjectsByYear.subjects',
        model: 'Subject',
        select: '-_id -__v',
        populate: {
          path: 'correlatives',
          select: 'code -_id',
        },
      })

    const transformedCareer = {
      ...career.toObject(),
      subjectsByYear: career.subjectsByYear.map((year) => ({
        year: year.year,
        subjects: year.subjects.map((subject) => ({
          ...subject.toObject(),
          correlatives: subject.correlatives.map(
            (correlative) => correlative.code
          ),
        })),
      })),
    }

    if (!career) return res.status(404).json({ message: 'Career Not Found' })

    res.json(transformedCareer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
