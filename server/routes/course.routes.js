import Router from 'express'
import {
  createCourse,
  getUserCourses,
  joinCourseByCode,
} from '../controllers/course.controllers.js'

const router = Router()

router.get('/', getUserCourses)
router.get('/join-course', joinCourseByCode)

router.post('/', createCourse)

export default router
