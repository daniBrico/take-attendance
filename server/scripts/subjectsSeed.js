import { config } from 'dotenv'
import { createRequire } from 'node:module'
import Subject from '../models/mongoDB/schemas/college/Subject.js'
import { databaseConnection } from '../models/mongoDB/database.js'

config({ path: '../../.env' })

console.log('RTATT_MONGODB_HOST:', process.env.RTATT_MONGODB_HOST)
console.log('RTATT_MONGODB_DATABASE:', process.env.RTATT_MONGODB_DATABASE)

databaseConnection()
  .then(() => {
    seedDatabase()
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err)
  })

const seedDatabase = async () => {
  try {
    const require = createRequire(import.meta.url)
    const subjecstData = require('./data/subjects.json')

    await Subject.deleteMany({})

    Subject.insertMany(subjecstData)
      .then((subjects) => {
        console.log('Materias agregadas correctamente: ', subjects)
      })
      .catch((err) => {
        console.log('Error al insertar documentos: ', err)
      })
      .finally(() => {
        databaseConnection.connection.close()
      })
  } catch (err) {
    console.log(err)
  }
}
