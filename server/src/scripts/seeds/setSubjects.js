import { createRequire } from 'node:module'
import Subject from '../../models/mongoDB/schemas/college/Subject.js'
import {
  openDatabaseConnection,
  closeDatabaseConnection,
} from '../../models/mongoDB/database.js'
import { dotenvConfig } from '../../config/config.js'

dotenvConfig()

openDatabaseConnection()
  .then(() => {
    seedDatabase()
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB: ', err)
  })

const seedDatabase = async () => {
  try {
    const require = createRequire(import.meta.url)
    const subjecstData = require('../data/subjects.json')

    await Subject.deleteMany({})

    Subject.insertMany(subjecstData)
      .then((subjects) => {
        console.log('Materias agregadas correctamente: ', subjects)
      })
      .catch((err) => {
        console.log('Error al insertar documentos: ', err)
      })
      .finally(async () => {
        await closeDatabaseConnection()
      })
  } catch (err) {
    console.log(err)
  }
}
