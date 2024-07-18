import Router from 'express'
import { createCourse, getCourses } from '../controllers/course.controllers.js'

const router = Router()

router.get('/', getCourses)

router.post('/', createCourse)

export default router
