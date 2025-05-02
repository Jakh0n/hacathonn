const tenants = [
	{
		id: 'abc123',
		name: 'ABC University',
		domain: 'abcuniversity.com',
		config: { enableRealtimeChat: true, theme: 'dark' },
	},
	{
		id: 'xyz456',
		name: 'XYZ School',
		domain: 'xyzschool.com',
		config: { enableRealtimeChat: false, theme: 'light' },
	},
]

export const getTenantDetails = (req, res) => {
	const tenant = tenants.find(t => t.id === req.params.id)
	if (tenant) {
		res.status(200).json(tenant)
	} else {
		res.status(404).json({ error: 'Tenant not found' })
	}
}

export const getTenantConfig = (req, res) => {
	const tenant = tenants.find(t => t.id === req.params.tenantId)
	if (tenant) {
		res.status(200).json(tenant.config)
	} else {
		res.status(404).json({ error: 'Tenant config not found' })
	}
}
