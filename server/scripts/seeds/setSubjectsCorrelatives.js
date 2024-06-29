import { createRequire } from 'node:module'
import { dotenvConfig } from '../../config/config.js'
import {
  closeDatabaseConnection,
  databaseConnection,
} from '../../models/mongoDB/database.js'
import Subject from '../../models/mongoDB/schemas/college/Subject.js'

dotenvConfig()

databaseConnection()
  .then(() => {
    setSubjectsCorrelatives()
  })
  .catch((err) => {
    console.log('Error al conectarse a MongoDB: ', err)
  })

const setSubjectsCorrelatives = async () => {
  try {
    const require = createRequire(import.meta.url)
    const subjectsCorrelatives = require('../data/subjectsCorrelative.json')

    Subject.find()
      .then((subjects) => {
        subjectsCorrelatives.map(async (subject) => {
          let idCorrelativas = []
          // console.log('A este código: ', subject.code)
          // console.log('Le corresponden estas correlativas: ')

          subject.correlatives.forEach((correlativa) => {
            let subjectFind = subjects.find((obj) => obj.code === correlativa)

            // console.log(`Correlativa: ${correlativa} - id: ${subjectFind._id}`)
            idCorrelativas.push(subjectFind._id)
          })
          // console.log(idCorrelativas)

          const subjectUpdate = await Subject.findOneAndUpdate(
            { code: `${subject.code}` },
            { $addToSet: { correlatives: { $each: idCorrelativas } } },
            { new: true }
          )

          console.log(subjectUpdate)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
}
