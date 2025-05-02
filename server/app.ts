import express from 'express'
import tenantRoutes from './routes/tenant-routes'

const app = express()

app.use(express.json())
app.use('/api/tenants', tenantRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
