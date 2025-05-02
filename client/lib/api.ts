import axios from 'axios'

interface TenantConfig {
	enableRealtimeChat: boolean
	theme: 'light' | 'dark'
	enableNotifications: boolean
}

interface Tenant {
	id: string
	name: string
	domain: string
	config: TenantConfig
}

export const fetchTenantConfig = async (
	tenantId: string
): Promise<TenantConfig> => {
	const response = await axios.get<Tenant>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/${tenantId}`
	)
	return response.data.config
}
