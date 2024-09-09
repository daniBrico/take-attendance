import Router from 'express'
import {
  createCourse,
  getEnrollments,
  getUserCourses,
  submitCourseEnrollment,
} from '../controllers/course.controllers.js'

const router = Router()

router.get('/', getUserCourses)

router.get('/join', submitCourseEnrollment)
router.get('/enrollments', getEnrollments)

router.post('/', createCourse)

export default router
