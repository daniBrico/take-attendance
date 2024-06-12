import express from 'express'
import logger from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const port = process.env.PORT ?? 3000

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)

export { app }
