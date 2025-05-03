require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const setupTenantRoutes = require('./routes/tenant-routes')

const app = express()
const httpServer = http.createServer(app)

// Faqat frontend domeniga ruxsat beramiz
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000'

// Express uchun CORS middleware
app.use(
	cors({
		origin: allowedOrigin,
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
		credentials: true,
	})
)

// Socket.IO uchun ham allowedOrigin ni ishlatamiz
const io = new Server(httpServer, {
	cors: {
		origin: allowedOrigin,
		methods: ['GET', 'POST'],
		credentials: true,
	},
})

// Asosiy yo'l
app.get('/', (req, res) => {
	res.status(200).json({
		status: 'ok',
		message: 'Server is running',
		api: '/api',
	})
})

app.use(express.json())
app.use('/api', setupTenantRoutes(io))

// WebSocket for notifications
io.on('connection', socket => {
	console.log('Client connected')
	socket.on('disconnect', () => console.log('Client disconnected'))
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
	console.log(`Allowed origin: ${allowedOrigin}`)
})
