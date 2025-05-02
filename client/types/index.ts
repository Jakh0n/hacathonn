export interface ChildProps {
	children: React.ReactNode
}

export interface Config {
	theme: 'light' | 'dark'
	enableRealtimeChat: boolean
	enableNotifications: boolean
}

export interface Tenant {
	id: string
	name: string
	domain: string
	config: Config
}
