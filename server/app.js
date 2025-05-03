require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const setupTenantRoutes = require('./routes/tenant-routes')

const app = express()
const httpServer = http.createServer(app)

// Use environment variable for CORS origin
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
const io = new Server(httpServer, { cors: { origin: allowedOrigin } })

// Enable CORS for all routes
app.use(
	cors({
		origin: allowedOrigin,
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
	})
)

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
})
