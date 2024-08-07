import { dotenvConfig } from '../../config/config.js'
import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from '../../models/mongoDB/database.js'
import { createRequire } from 'node:module'
import Subject from '../../models/mongoDB/schemas/college/Subject.js'
import Career from '../../models/mongoDB/schemas/college/Career.js'

dotenvConfig()

const main = async () => {
  try {
    await openDatabaseConnection()
    await setCareers()
  } catch (err) {
    console.log('Error al conectarse a MongoDB: ', err)
  } finally {
    closeDatabaseConnection()
  }
}

const setCareers = async () => {
  const require = createRequire(import.meta.url)
  const careers = require('../data/careers.json')

  try {
    // Obtengo todas las materias de la base de datos
    const subjects = await Subject.find()

    // Recorro las carreras del archivo .json (por ahora solo hay una)
    for (const career of careers) {
      let subjectsByYearToLoad = []

      // Iterate through each year of the career, which includes both the year and the subjects
      for (const subjectsByYear of career.subjectsByYear) {
        let subjectsFindId = []

        // For each career year, iterate through it's subjects
        for (const subject of subjectsByYear.subjects) {
          // Look up each of those subjects in the database using their codes
          let subjectFind = subjects.find((obj) => obj.code === subject.code)

          if (subjectFind) {
            // For each subject found in the database, store it's ID in a temporary array
            subjectsFindId.push(subjectFind._id)
          }
        }

        // In another temporary array, store the year and the ID's
        subjectsByYearToLoad.push({
          year: subjectsByYear.year,
          subjects: subjectsFindId,
        })
      }

      // Save the new career with it's subjects by year in the database
      const newCareer = new Career({
        name: career.name,
        duration: career.duration,
        intermediateDegree: career.intermediateDegree,
        intermediateDegreeDuration: career.intermediateDegreeDuration,
        subjectsByYear: subjectsByYearToLoad,
      })

      await newCareer.save()

      console.log(newCareer)
    }
  } catch (err) {
    console.log('Error adding careers: ', err)
  }
}

main()
