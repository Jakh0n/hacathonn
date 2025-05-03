const { v4: uuidv4 } = require('uuid')

const tenants = [
	{
		id: uuidv4(),
		name: 'Tenant 1',
		domain: 'tenant1.example.com',
		config: {
			enableRealtimeChat: true,
			theme: 'light',
			enableNotifications: true,
		},
	},
	{
		id: uuidv4(),
		name: 'Tenant 2',
		domain: 'tenant2.example.com',
		config: {
			enableRealtimeChat: false,
			theme: 'dark',
			enableNotifications: false,
		},
	},
]

module.exports = { tenants }
