import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './modules/admin/admin.routes.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.use((error, _request, response, _next) => {
  console.error(error)
  if (error.name === 'ValidationError') return response.status(400).json({ message: error.message })
  return response.status(500).json({ message: 'Something went wrong. Please try again.' })
})

export default app
