import express from 'express'
import { tenants } from '../models/tenant-models.js'

const router = express.Router()

// Function to set up routes with io
const setupTenantRoutes = io => {
	// GET /api/tenants/:id
	router.get('/tenants/:id', (req, res) => {
		const tenant = tenants.find(t => t.id === req.params.id)
		if (!tenant) {
			return res.status(404).json({ error: 'Tenant not found' })
		}
		// Simulate notification
		if (tenant.config.enableNotifications) {
			io.emit('notification', `Welcome to ${tenant.name}!`)
		}
		res.json(tenant)
	})

	// GET /api/config/:tenantId
	router.get('/config/:tenantId', (req, res) => {
		const tenant = tenants.find(t => t.id === req.params.tenantId)
		if (!tenant) {
			return res.status(404).json({ error: 'Tenant not found' })
		}
		res.json(tenant.config)
	})

	return router
}

export default setupTenantRoutes
