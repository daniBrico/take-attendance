import Router from 'express'
import {
  createCourse,
  getEnrollments,
  getUserCourses,
  setNewEnrollment,
} from '../controllers/course.controllers.js'

const router = Router()

router.get('/', getUserCourses)

router.get('/join', setNewEnrollment)
router.get('/enrollments', getEnrollments)

router.post('/', createCourse)

export default router
