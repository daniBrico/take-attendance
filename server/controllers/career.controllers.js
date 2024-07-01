import Career from '../models/mongoDB/schemas/college/Career.js'

export const getCareersNames = async (req, res) => {
  try {
    const careersNames = await Career.find({}, 'name')

    res.json(careersNames)
  } catch (err) {
    res.staus(500).json({ message: err.mesage })
  }
}
