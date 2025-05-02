'use client'

import Navbar from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { fetchTenantConfig } from '@/lib/api'
import { useSocket } from '@/lib/socket'
import { useEffect, useState } from 'react'
import {
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

interface TenantConfig {
	enableRealtimeChat: boolean
	theme: 'light' | 'dark'
	enableNotifications: boolean
}

const userActivityData = [
	{ day: 'Mon', users: 120 },
	{ day: 'Tue', users: 150 },
	{ day: 'Wed', users: 90 },
	{ day: 'Thu', users: 200 },
	{ day: 'Fri', users: 180 },
	{ day: 'Sat', users: 220 },
	{ day: 'Sun', users: 160 },
]

const usageDistributionData = [
	{ name: 'Active Users', value: 60 },
	{ name: 'Inactive Users', value: 40 },
]

const COLORS = ['#5a67d8', '#e53e3e']

export default function Dashboard() {
	const [tenantId, setTenantId] = useState<string>('')
	const [tenantConfig, setTenantConfig] = useState<TenantConfig | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
	const { toast } = useToast()
	const socket = useSocket()

	// Fetch tenant configuration
	const loadTenantConfig = async (id: string) => {
		setIsLoading(true)
		try {
			const config = await fetchTenantConfig(id)
			setTenantConfig(config)
			localStorage.setItem('tenantId', id)
		} catch (error: any) {
			toast({
				title: 'Error',
				description: `Failed to fetch tenant configuration: ${
					error.response?.data?.error || error.message
				}`,
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	// WebSocket setup for notifications
	useEffect(() => {
		if (socket && tenantConfig?.enableNotifications) {
			socket.on('notification', (message: string) => {
				toast({
					title: 'Notification',
					description: message,
					variant: 'default',
					className:
						tenantConfig.theme === 'dark'
							? 'bg-gray-800 text-white border-gray-600'
							: 'bg-white text-gray-900 border-gray-200',
				})
			})

			return () => {
				socket.off('notification')
			}
		}
	}, [socket, tenantConfig?.enableNotifications])

	// Load saved tenant on mount
	useEffect(() => {
		const savedTenantId = localStorage.getItem('tenantId')
		if (savedTenantId && ['tenant1', 'tenant2'].includes(savedTenantId)) {
			setTenantId(savedTenantId)
			loadTenantConfig(savedTenantId)
		}
	}, [])

	// Handle tenant selection
	const handleTenantSelect = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!tenantId || !['tenant1', 'tenant2'].includes(tenantId)) {
			toast({
				title: 'Error',
				description: 'Please enter a valid tenant ID (tenant1 or tenant2)',
				variant: 'destructive',
			})
			return
		}
		await loadTenantConfig(tenantId)
	}

	// Clear tenant session
	const clearTenant = () => {
		setTenantId('')
		setTenantConfig(null)
		localStorage.removeItem('tenantId')
		setIsMobileMenuOpen(false)
	}

	return (
		<div
			className={
				tenantConfig?.theme === 'dark'
					? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen'
					: 'bg-gradient-to-br from-blue-50 via-gray-100 to-white min-h-screen'
			}
		>
			{/* Navbar */}
			<Navbar
				tenantId={tenantId}
				setTenantId={setTenantId}
				isLoading={isLoading}
				handleTenantSelect={handleTenantSelect}
				clearTenant={clearTenant}
			/>

			{/* Sidebar and Main Content */}
			<div className='flex'>
				{/* Sidebar */}
				<aside className='w-64 bg-gray-800 text-white p-4 shadow-2xl'>
					<h2 className='text-2xl font-bold mb-6 text-indigo-400'>
						Tenant Menu
					</h2>
					<nav>
						<ul className='space-y-4'>
							<li>
								<Button
									variant='ghost'
									onClick={() => setTenantId('tenant1')}
									className='w-full justify-start text-white hover:bg-indigo-600'
								>
									Tenant 1
								</Button>
							</li>
							<li>
								<Button
									variant='ghost'
									onClick={() => setTenantId('tenant2')}
									className='w-full justify-start text-white hover:bg-indigo-600'
								>
									Tenant 2
								</Button>
							</li>
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<main className='flex-1 p-6'>
					{!tenantConfig ? (
						<Card className='max-w-md mx-auto mt-12 shadow-xl'>
							<CardHeader>
								<CardTitle className='text-3xl text-indigo-600 dark:text-indigo-300'>
									Select Tenant
								</CardTitle>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleTenantSelect} className='space-y-6'>
									<Input
										value={tenantId}
										onChange={e => setTenantId(e.target.value)}
										placeholder='Enter Tenant ID (e.g., tenant1 or tenant2)'
										className='w-full p-3 text-lg text-gray-900 dark:text-gray-100 border-2 border-indigo-300 dark:border-indigo-600 rounded-lg focus:ring-2 focus:ring-indigo-500'
									/>
									<Button
										type='submit'
										disabled={isLoading}
										className='w-full py-3 text-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors'
									>
										{isLoading ? 'Loading...' : 'Load Tenant'}
									</Button>
								</form>
							</CardContent>
						</Card>
					) : (
						<div className='space-y-8'>
							<h1 className='text-4xl font-extrabold text-indigo-600 dark:text-indigo-300 animate-fade-in'>
								Welcome to{' '}
								{tenantId === 'tenant1' ? 'Tenant One' : 'Tenant Two'} Dashboard
							</h1>

							{/* Dashboard Modules */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{tenantConfig.enableRealtimeChat && (
									<Card className='shadow-xl'>
										<CardHeader>
											<CardTitle className='text-2xl text-indigo-600 dark:text-indigo-300'>
												Real-Time Chat
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className='text-gray-600 dark:text-gray-300 text-lg'>
												Engage in real-time conversations with your team.
											</p>
										</CardContent>
									</Card>
								)}
								<Card className='shadow-xl'>
									<CardHeader>
										<CardTitle className='text-2xl text-indigo-600 dark:text-indigo-300'>
											Analytics
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='space-y-6'>
											<p className='text-gray-600 dark:text-gray-300 text-lg'>
												User Activity (Last 7 Days):
											</p>
											<div className='h-64'>
												<ResponsiveContainer width='100%' height='100%'>
													<BarChart data={userActivityData}>
														<XAxis
															dataKey='day'
															stroke={
																tenantConfig.theme === 'dark'
																	? '#a0aec0'
																	: '#4a5568'
															}
														/>
														<YAxis
															stroke={
																tenantConfig.theme === 'dark'
																	? '#a0aec0'
																	: '#4a5568'
															}
														/>
														<Tooltip
															contentStyle={{
																backgroundColor:
																	tenantConfig.theme === 'dark'
																		? '#1a202c'
																		: '#fff',
																borderColor:
																	tenantConfig.theme === 'dark'
																		? '#4a5568'
																		: '#e2e8f0',
															}}
														/>
														<Bar dataKey='users' fill='#5a67d8' />
													</BarChart>
												</ResponsiveContainer>
											</div>
											<p className='text-gray-600 dark:text-gray-300 text-lg'>
												Usage Distribution:
											</p>
											<div className='h-64'>
												<ResponsiveContainer width='100%' height='100%'>
													<PieChart>
														<Pie
															data={usageDistributionData}
															dataKey='value'
															nameKey='name'
															cx='50%'
															cy='50%'
															outerRadius={80}
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
														<Tooltip
															contentStyle={{
																backgroundColor:
																	tenantConfig.theme === 'dark'
																		? '#1a202c'
																		: '#fff',
																borderColor:
																	tenantConfig.theme === 'dark'
																		? '#4a5568'
																		: '#e2e8f0',
															}}
														/>
													</PieChart>
												</ResponsiveContainer>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					)}
					<Toaster />
				</main>
			</div>
		</div>
	)
}
