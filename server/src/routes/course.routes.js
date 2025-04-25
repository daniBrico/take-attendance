import Router from 'express'
import {
  agreeEnrollment,
  createCourse,
  getEnrollments,
  getCourses,
  setNewEnrollment,
} from '../controllers/course.controllers.js'

const router = Router()

router.get('/', getCourses)

router.get('/join', setNewEnrollment)
router.get('/enrollments', getEnrollments)

router.post('/', createCourse)

router.patch('/:courseId/enrollments/:studentId', agreeEnrollment)

export default router
