import { Tenant } from '@/types'
import axios from 'axios'

export const fetchAllTenants = async (): Promise<Tenant[]> => {
	const response = await axios.get<Tenant[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/tenants`
	)
	return response.data
}

export const fetchTenantConfig = async (tenantId: string): Promise<Tenant> => {
	const response = await axios.get<Tenant>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/${tenantId}`
	)
	return response.data
}
