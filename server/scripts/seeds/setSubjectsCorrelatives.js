import { createRequire } from 'node:module'
import { dotenvConfig } from '../../config/config.js'
import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from '../../models/mongoDB/database.js'
import Subject from '../../models/mongoDB/schemas/college/Subject.js'

dotenvConfig()

const main = async () => {
  try {
    await openDatabaseConnection()
    await setSubjectsCorrelatives()
  } catch (err) {
    console.log('Error al conectarse a MongoDB: ', err)
  } finally {
    try {
      await closeDatabaseConnection()
    } catch (err) {
      console.log('Error al cerrar la conexión: ', err)
    }
  }
}

const setSubjectsCorrelatives = async () => {
  try {
    const require = createRequire(import.meta.url)
    const subjectsCorrelatives = require('../data/subjectsCorrelative.json')

    // Obtengo todas las materias cargadas en la base de datos
    const subjects = await Subject.find().exec()

    // Recorro el arreglo de objetos subjectsCorrelatives
    await Promise.all(
      subjectsCorrelatives.map(async (subject) => {
        let idCorrelatives = []

        // Por cada materia, accedo a sus correlativas
        subject.correlatives.forEach((correlative) => {
          // Por cada correlativa de mi archivo .json, la busco en el arreglo de materias que obtuve de la base de datos
          let subjectFind = subjects.find((obj) => obj.code === correlative)
          // Si la encuentro, me guardo su ID en el arreglo idCorrelatives
          if (subjectFind) idCorrelatives.push(subjectFind._id)
        })

        const subjectUpdate = await Subject.findOneAndUpdate(
          { code: `${subject.code}` },
          { $addToSet: { correlatives: { $each: idCorrelatives } } },
          { new: true }
        )

        console.log(subjectUpdate)
      })
    )
  } catch (err) {
    console.log('Error en setSubjectsCorrelatives: ', err)
  }
}

main()
