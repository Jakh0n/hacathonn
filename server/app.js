import cors from 'cors'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import setupTenantRoutes from './routes/tenant-routes.js'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: 'http://localhost:3000' } })

// Enable CORS for all routes
app.use(
	cors({
		origin: 'http://localhost:3000',
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
