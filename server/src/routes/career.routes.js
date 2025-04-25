import Router from 'express'
import {
  getCareerNames,
  getSubjectNames,
  getCareerByID,
} from '../controllers/career.controllers.js'

const router = Router()

router.get('/names', getCareerNames)
router.get('/subjects-names', getSubjectNames)

router.get('/:id', getCareerByID)

export default router
