import Router from 'express'
import {
  getCareersNames,
  getSubjectsNames,
} from '../controllers/career.controllers.js'

const router = Router()

router.get('/names', getCareersNames)
router.get('/subjects-names', getSubjectsNames)

export default router
