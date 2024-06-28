import { databaseConnection } from '../models/mongoDB/database.js'
import { createRequire } from 'node:module'

databaseConnection()

const seedDatabase = async () => {
  try {
    const require = createRequire(import.meta.url)
    const subjecstData = require('./data/subjects.json')
    console.log(subjecstData)
  } catch (err) {
    console.log(err)
  }
}

seedDatabase()
