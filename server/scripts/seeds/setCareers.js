import { dotenvConfig } from '../../config/config.js'
import { databaseConnection } from '../../models/mongoDB/database.js'
import { createRequire } from 'node:module'
import Subject from '../../models/mongoDB/schemas/college/Subject.js'
import Career from '../../models/mongoDB/schemas/college/Career.js'

dotenvConfig()

databaseConnection().then(() => {
  setCareers()
})

const setCareers = async () => {
  const require = createRequire(import.meta.url)
  const careers = require('../data/careers.json')

  try {
    const subjects = await Subject.find()

    for (const career of careers) {
      let subjectsByYearToLoad = []

      for (const subjectByYear of career.subjectsByYear) {
        let subjectsFindId = []

        for (const subject of subjectByYear.subjects) {
          let subjectFind = subjects.find((obj) => obj.code === subject.code)

          if (subjectFind) {
            subjectsFindId.push(subjectFind._id)
          }
        }

        subjectsByYearToLoad.push({
          year: subjectByYear.year,
          subjects: subjectsFindId,
        })
      }

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
