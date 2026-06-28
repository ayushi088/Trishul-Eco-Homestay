import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import homestayRoutes from './routes/homestayRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

// JSON Parser
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Trishul Backend Server is healthy and running.' })
})

// Mount MVC API routes
app.use('/api/homestays', homestayRoutes)
app.use('/api/bookings', bookingRoutes)

// Fallback middlewares for error control
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`[Trishul Backend] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})
