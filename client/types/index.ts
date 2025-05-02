export interface ChildProps {
	children: React.ReactNode
}

export interface Tenant {
	id: string
	domain: string
	name: string
	config: TenantConfig
}

export interface TenantConfig {
	enableRealtimeChat: boolean
	theme: 'light' | 'dark'
	enableNotifications: boolean
}
