// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { TenantConfig } from '@/types/tenant'
// import {
// 	Bar,
// 	BarChart,
// 	Cell,
// 	Pie,
// 	PieChart,
// 	ResponsiveContainer,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from 'recharts'

// const userActivityData = [
// 	{ day: 'Mon', users: 120 },
// 	{ day: 'Tue', users: 150 },
// 	{ day: 'Wed', users: 90 },
// 	{ day: 'Thu', users: 200 },
// 	{ day: 'Fri', users: 180 },
// 	{ day: 'Sat', users: 220 },
// 	{ day: 'Sun', users: 160 },
// ]

// const usageDistributionData = [
// 	{ name: 'Active Users', value: 60 },
// 	{ name: 'Inactive Users', value: 40 },
// ]

// const COLORS = ['#5a67d8', '#e53e3e']

// interface DashboardProps {
// 	tenantConfig: TenantConfig
// 	tenantId: string
// }

// export default function Dashboard({ tenantConfig, tenantId }: DashboardProps) {
// 	return (
// 		<div className='space-y-8'>
// 			<h1 className='text-4xl font-extrabold text-indigo-600 dark:text-indigo-300'>
// 				Welcome to {tenantId === 'tenant1' ? 'Tenant One' : 'Tenant Two'}{' '}
// 				Dashboard
// 			</h1>

// 			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
// 				{tenantConfig.enableRealtimeChat && (
// 					<Card className='shadow-xl'>
// 						<CardHeader>
// 							<CardTitle className='text-2xl text-indigo-600 dark:text-indigo-300'>
// 								Real-Time Chat
// 							</CardTitle>
// 						</CardHeader>
// 						<CardContent>
// 							<p className='text-gray-600 dark:text-gray-300 text-lg'>
// 								Engage in real-time conversations with your team.
// 							</p>
// 						</CardContent>
// 					</Card>
// 				)}
// 				<Card className='shadow-xl'>
// 					<CardHeader>
// 						<CardTitle className='text-2xl text-indigo-600 dark:text-indigo-300'>
// 							Analytics
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<div className='space-y-6'>
// 							<p className='text-gray-600 dark:text-gray-300 text-lg'>
// 								User Activity (Last 7 Days):
// 							</p>
// 							<div className='h-64'>
// 								<ResponsiveContainer width='100%' height='100%'>
// 									<BarChart data={userActivityData}>
// 										<XAxis
// 											dataKey='day'
// 											stroke={
// 												tenantConfig.theme === 'dark' ? '#a0aec0' : '#4a5568'
// 											}
// 										/>
// 										<YAxis
// 											stroke={
// 												tenantConfig.theme === 'dark' ? '#a0aec0' : '#4a5568'
// 											}
// 										/>
// 										<Tooltip
// 											contentStyle={{
// 												backgroundColor:
// 													tenantConfig.theme === 'dark' ? '#1a202c' : '#fff',
// 												borderColor:
// 													tenantConfig.theme === 'dark' ? '#4a5568' : '#e2e8f0',
// 											}}
// 										/>
// 										<Bar dataKey='users' fill='#5a67d8' />
// 									</BarChart>
// 								</ResponsiveContainer>
// 							</div>
// 							<p className='text-gray-600 dark:text-gray-300 text-lg'>
// 								Usage Distribution:
// 							</p>
// 							<div className='h-64'>
// 								<ResponsiveContainer width='100%' height='100%'>
// 									<PieChart>
// 										<Pie
// 											data={usageDistributionData}
// 											dataKey='value'
// 											nameKey='name'
// 											cx='50%'
// 											cy='50%'
// 											outerRadius={80}
// 											fill='#8884d8'
// 											label
// 										>
// 											{usageDistributionData.map((entry, index) => (
// 												<Cell
// 													key={`cell-${index}`}
// 													fill={COLORS[index % COLORS.length]}
// 												/>
// 											))}
// 										</Pie>
// 										<Tooltip
// 											contentStyle={{
// 												backgroundColor:
// 													tenantConfig.theme === 'dark' ? '#1a202c' : '#fff',
// 												borderColor:
// 													tenantConfig.theme === 'dark' ? '#4a5568' : '#e2e8f0',
// 											}}
// 										/>
// 									</PieChart>
// 								</ResponsiveContainer>
// 							</div>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>
// 		</div>
// 	)
// }
