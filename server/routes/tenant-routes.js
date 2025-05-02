import { Router } from 'express'
const { io } = require('../index')
const { tenants } = require('../models/tenant-models')

const router = Router()

// Get /api/tenants/:id
router.get('/:id', (req, res) => {
	const tenant = tenants.find(t => t.id === req.params.id)

	if (!tenant) {
		return res.status(404).json({ error: 'Tenant not found' })
	}
	//Simulate notification
	if (tenant.config.enableNotifications) {
		io.emit('notification', `Welcome to ${tenant.name}!`)
	}
	res.json(tenant)
})

// Get /api/tenants/config/:tenantId
router.get('/config/:tenantId', (req, res) => {
	const tenant = tenants.find(t => t.id === req.params.tenantId)

	if (!tenant) {
		return res.status(404).json({ error: 'Tenant not found' })
	}

	res.json(tenant.config)
})

export default router
