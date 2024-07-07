import Router from 'express'
import { createCourse, getCourses } from '../controllers/course.controllers.js'

const router = Router()

router.post('/', createCourse)

router.get('/', getCourses)

export default router
