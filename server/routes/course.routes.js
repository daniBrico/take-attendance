import Router from 'express'
import {
  agreeEnrollment,
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

router.patch('/:courseId/enrollments/:studentId', agreeEnrollment)

export default router
