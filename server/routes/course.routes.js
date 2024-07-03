import Router from 'express'
import { createCourse } from '../controllers/course.controllers.js'

const router = Router()

router.post('/', createCourse)

export default router
