import Router from 'express'
import {
  createCourse,
  getUserCourses,
  submitCourseEnrollment,
} from '../controllers/course.controllers.js'

const router = Router()

router.get('/', getUserCourses)
router.get('/join-course', submitCourseEnrollment)

router.post('/', createCourse)

export default router
