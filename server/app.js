import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import tenantRoutes from './routes/tenant.js'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

app.use(express.json())
app.use('/api', tenantRoutes)

// WebSocket for notifications
io.on('connection', socket => {
	console.log('Client connected')
	socket.on('disconnect', () => console.log('Client disconnected'))
})

export { io }

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
