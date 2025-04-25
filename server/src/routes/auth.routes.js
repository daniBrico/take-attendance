import { Router } from 'express'
import {
  login,
  logout,
  profile,
  register,
  verifyToken,
} from '../controllers/auth.controllers.js'
import { authRequired } from '../middleware/validatetoken.js'

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.get('/profile', authRequired, profile)

router.get('/verify', verifyToken)

export default router
