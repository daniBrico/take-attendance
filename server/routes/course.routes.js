import Router from 'express'
import {
  createCourse,
  getUserCourses,
} from '../controllers/course.controllers.js'

const router = Router()

router.get('/', getUserCourses)

router.post('/', createCourse)

export default router
