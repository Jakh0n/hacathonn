interface ActivityData {
	day: string
	users: number
}

export const userActivityData: ActivityData[] = [
	{ day: 'Mon', users: 120 },
	{ day: 'Tue', users: 150 },
	{ day: 'Wed', users: 90 },
	{ day: 'Thu', users: 200 },
	{ day: 'Fri', users: 180 },
	{ day: 'Sat', users: 220 },
	{ day: 'Sun', users: 160 },
]

export const COLORS = ['#5a67d8', '#e53e3e']

export const usageDistributionData = [
	{ name: 'Active Users', value: 60 },
	{ name: 'Inactive Users', value: 40 },
]
