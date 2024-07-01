import express from 'express'
import logger from 'morgan'
import authRoutes from './routes/auth.routes.js'
import careerRoutes from './routes/career.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/courses', careerRoutes)

export { app }
