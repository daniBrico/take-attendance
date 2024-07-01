import Router from 'express'
import { getCareersNames } from '../controllers/career.controllers.js'

const router = Router()

router.get('/get-careers-names', getCareersNames)

export default router
