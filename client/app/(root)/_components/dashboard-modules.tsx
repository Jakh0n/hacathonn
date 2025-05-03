import { Badge } from '@/components/ui/badge'
import {
	COLORS,
	usageDistributionData,
	userActivityData,
} from '@/constants/data'
import { Tenant } from '@/types'
import { Bell, Globe, MessageSquare, Sun } from 'lucide-react'
import {
	Bar,
	Cell,
	Pie,
	BarChart as RechartsBarChart,
	PieChart as RechartsPieChart,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'

interface ActivityData {
	day: string
	users: number
}

interface ModuleProps {
	tenant: Tenant
}
const DashboardModules = ({ tenant }: ModuleProps) => {
	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
				<div className='flex flex-col space-y-2'>
					<div className='p-4 border rounded-lg'>
						<h1
							className={`text-2xl  font-bold font-spaceGrotesk ${
								tenant.config.theme === 'dark' ? 'text-white' : 'text-black'
							}`}
						>
							Usage Distribution:
						</h1>
						<div className='p-4 h-48'>
							<ResponsiveContainer width='100%' height='100%'>
								<RechartsPieChart>
									<Pie
										data={usageDistributionData}
										dataKey='value'
										nameKey='name'
										cx='50%'
										cy='50%'
										outerRadius={50}
										fill='#8884d8'
										label
									>
										{usageDistributionData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<RechartsTooltip
										contentStyle={{
											backgroundColor:
												tenant.config.theme === 'dark' ? '#1a202c' : '#fff',
											borderColor:
												tenant.config.theme === 'dark' ? '#4a5568' : '#e2e8f0',
										}}
									/>
								</RechartsPieChart>
							</ResponsiveContainer>
						</div>
					</div>
					<div className='p-4 border rounded-lg'>
						<div className='col-span-1'>
							<div
								className={`flex flex-row items-center justify-between pb-2 ${
									tenant.config.theme === 'dark' ? 'text-white' : 'text-black'
								}`}
							>
								<h1 className='text-2xl font-bold font-spaceGrotesk'>
									{tenant.name}
								</h1>
								<Globe className='size-6 text-gray-500' />
							</div>
							<div>
								<div className='space-y-4'>
									<div
										className={`p-4 rounded-lg ${
											tenant.config.theme === 'dark'
												? 'bg-gray-800'
												: 'bg-gray-100'
										}`}
									>
										<p
											className={`text-sm ${
												tenant.config.theme === 'dark'
													? 'text-white'
													: 'text-black'
											}`}
										>
											Tenant ID:
										</p>
										<h3
											className={`text-lg font-medium mt-1 ${
												tenant.config.theme === 'dark'
													? 'text-white'
													: 'text-black'
											}`}
										>
											{tenant.id}
										</h3>
										<div className='flex items-center mt-2'>
											<Globe className='size-4 mr-2 text-gray-500' />
											<p
												className={` text-muted-foreground text-sm ${
													tenant.config.theme === 'dark'
														? 'text-white'
														: 'text-black'
												}`}
											>
												{tenant.domain}
											</p>
										</div>
									</div>
									<div className='grid grid-cols-1 gap-4'>
										<div
											className={`flex items-center justify-between mt-2 border p-5 rounded-lg ${
												tenant.config.theme === 'dark'
													? 'bg-gray-800'
													: 'bg-gray-200'
											}`}
										>
											<div className='flex items-center'>
												<MessageSquare className='w-4 h-4 mr-2 text-blue-500' />
												<p className='text-md text-gray-500 dark:text-gray-400'>
													Realtime Chat
												</p>
											</div>

											{tenant.config.enableRealtimeChat ? (
												<Badge
													variant='secondary'
													className=' text-green-800 bg-green-100'
												>
													Enabled
												</Badge>
											) : (
												<Badge
													variant='secondary'
													className=' text-red-800 bg-red-100'
												>
													Disabled
												</Badge>
											)}
										</div>

										<div
											className={`flex items-center justify-between mt-2 border p-5 rounded-lg ${
												tenant.config.theme === 'dark'
													? 'bg-gray-800'
													: 'bg-gray-200'
											}`}
										>
											<div className='flex items-center'>
												<Sun className='w-4 h-4 mr-2 text-blue-500' />
												<p className='text-md text-gray-500 dark:text-gray-400'>
													Theme
												</p>
											</div>
											<Badge
												variant='secondary'
												className='bg-green-100 text-green-800'
											>
												{tenant.config.theme === 'dark' ? 'Dark' : 'Light'}
											</Badge>
										</div>

										<div
											className={`flex items-center justify-between mt-2 border p-5 rounded-lg ${
												tenant.config.theme === 'dark'
													? 'bg-gray-800'
													: 'bg-gray-200'
											}`}
										>
											<div className='flex items-center'>
												<Bell className='w-4 h-4 mr-2 text-blue-500' />
												<p className='text-md text-gray-500 dark:text-gray-400'>
													Notifications
												</p>
											</div>
											{tenant.config.enableNotifications ? (
												<Badge
													variant='secondary'
													className=' text-green-800  bg-green-100'
												>
													Enabled
												</Badge>
											) : (
												<Badge
													variant='secondary'
													className=' text-red-800 bg-red-100'
												>
													Disabled
												</Badge>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col space-x-2'>
					<div className='p-4 border rounded-lg'>
						<p
							className={`text-2xl font-bold font-spaceGrotesk ${
								tenant.config.theme === 'dark' ? 'text-white' : 'text-black'
							}`}
						>
							User Activity (Last 7 Days):
						</p>
						<div className='h-56 mt-8'>
							<ResponsiveContainer width='100%' height='100%'>
								<RechartsBarChart data={userActivityData}>
									<XAxis
										dataKey='day'
										stroke={
											tenant.config.theme === 'dark' ? '#a0aec0' : '#4a5568'
										}
									/>
									<YAxis
										stroke={
											tenant.config.theme === 'dark' ? '#a0aec0' : '#4a5568'
										}
									/>
									<RechartsTooltip
										contentStyle={{
											backgroundColor:
												tenant.config.theme === 'dark' ? '#1a202c' : '#fff',
											borderColor:
												tenant.config.theme === 'dark' ? '#4a5568' : '#e2e8f0',
										}}
									/>
									<Bar dataKey='users' fill='#5a67d8' />
								</RechartsBarChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div className='p-4 border rounded-lg mt-4'>
						<h2
							className={`text-2xl font-bold font-spaceGrotesk ${
								tenant.config.theme === 'dark' ? 'text-white' : 'text-black'
							}`}
						>
							Realtime Chating
						</h2>

						<div
							className={`flex items-center justify-between mt-2 border p-5 rounded-lg ${
								tenant.config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
							}`}
						>
							<div className='flex items-center'>
								<MessageSquare className='w-4 h-4 mr-2 text-blue-500' />
								<p className='text-md text-gray-500 dark:text-gray-400'>
									Realtime Chat
								</p>
							</div>

							{tenant.config.enableRealtimeChat ? (
								<Badge
									variant='secondary'
									className=' text-green-800 bg-green-100'
								>
									Enabled
								</Badge>
							) : (
								<Badge variant='secondary' className=' text-red-800 bg-red-100'>
									Disabled
								</Badge>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardModules
