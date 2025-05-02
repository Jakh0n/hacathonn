const tenants = [
	{
		id: 'tenant1',
		name: 'Tenant One',
		domain: 'tenant1.example.com',
		config: {
			enableRealtimeChat: true,
			theme: 'light',
			enableNotifications: true,
		},
	},
	{
		id: 'tenant2',
		name: 'Tenant Two',
		domain: 'tenant2.example.com',
		config: {
			enableRealtimeChat: false,
			theme: 'dark',
			enableNotifications: false,
		},
	},
]

export { tenants }
