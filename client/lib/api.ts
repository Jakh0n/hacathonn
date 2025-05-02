import { Config, Tenant } from '@/types'
import axios from 'axios'

// Fetch tenant config

export const fetchTenantConfig = async (tenantId: string): Promise<Config> => {
	const response = await axios.get<Tenant>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/${tenantId}`
	)
	return response.data.config
}
