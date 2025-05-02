const request = require('supertest')
const express = require('express')
const tenantRoutes = require('../routes/tenant-routes')

const app = express()
app.use(express.json())
app.use('/api', tenantRoutes)

describe('Tenant API', () => {
	test('GET /api/tenants/:id - success', async () => {
		const response = await request(app).get('/api/tenants/tenant1')
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('id', 'tenant1')
		expect(response.body.config).toHaveProperty('theme', 'light')
	})

	test('GET /api/tenants/:id - not found', async () => {
		const response = await request(app).get('/api/tenants/unknown')
		expect(response.status).toBe(404)
		expect(response.body).toEqual({ error: 'Tenant not found' })
	})

	test('GET /api/config/:tenantId - success', async () => {
		const response = await request(app).get('/api/config/tenant1')
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('enableRealtimeChat', true)
	})

	test('GET /api/config/:tenantId - not found', async () => {
		const response = await request(app).get('/api/config/unknown')
		expect(response.status).toBe(404)
		expect(response.body).toEqual({ error: 'Tenant not found' })
	})
})
