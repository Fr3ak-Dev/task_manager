import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'
import { corsConfig } from './config/cors'
import morgan from 'morgan'

dotenv.config()

connectDB()

const app = express()

app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))

// Leer datps de formularios
app.use(express.json()) // Esta línea configura la aplicación para que use el middleware de Express que permite manejar solicitudes HTTP con un cuerpo JSON.

// Routes
app.use('/api/projects', projectRoutes)

export default app