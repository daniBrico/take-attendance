import Router from 'express'
import {
  getCareersNames,
  getSubjectsNames,
  getCareerByID,
} from '../controllers/career.controllers.js'

const router = Router()

router.get('/names', getCareersNames)
router.get('/subjects-names', getSubjectsNames)

router.get('/:id', getCareerByID)

export default router
