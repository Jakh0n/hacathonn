import { Clapperboard, Home, Layers2, TvMinimalPlay } from 'lucide-react'

export const navigation_items = [
	{
		label: 'Home',
		href: '/',
		icon: Home,
	},
	{ label: 'Lives', href: '/lives', icon: Layers2 },
	{ label: 'Subscriptions', href: '/subscriptions', icon: TvMinimalPlay },
	{ label: 'Dashboard', href: '/dashboard', icon: Clapperboard },
]
export const userActivityData = [
	{ day: 'Mon', users: 120 },
	{ day: 'Tue', users: 150 },
	{ day: 'Wed', users: 90 },
	{ day: 'Thu', users: 200 },
	{ day: 'Fri', users: 180 },
	{ day: 'Sat', users: 220 },
	{ day: 'Sun', users: 160 },
]

export const usageDistributionData = [
	{ name: 'Active Users', value: 60 },
	{ name: 'Inactive Users', value: 40 },
]
export const COLORS = ['#5a67d8', '#e53e3e']
