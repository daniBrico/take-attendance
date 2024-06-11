import express from 'express'
import logger from 'morgan'
import authRoutes from './routes/auth.routes.js'

const port = process.env.PORT ?? 3000

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use('/api', authRoutes)

export { app }
