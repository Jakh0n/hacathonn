'use client'

import Notification from '@/components/shared/notification'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { fetchTenantConfig } from '@/lib/api'
import { useSocket } from '@/lib/socket'
import { useEffect, useState } from 'react'

interface TenantConfig {
	enableRealtimeChat: boolean
	theme: 'light' | 'dark'
	enableNotifications: boolean
}

export default function Dashboard() {
	const [tenantId, setTenantId] = useState<string>('')
	const [tenantConfig, setTenantConfig] = useState<TenantConfig | null>(null)
	const [notifications, setNotifications] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()
	const socket = useSocket()

	// Fetch tenant configuration
	const loadTenantConfig = async (id: string) => {
		setIsLoading(true)
		try {
			const config = await fetchTenantConfig(id)
			setTenantConfig(config)
			localStorage.setItem('tenantId', id)
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to fetch tenant configuration',
				variant: 'destructive',
			})
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	// WebSocket setup for notifications
	useEffect(() => {
		if (tenantConfig?.enableNotifications && socket) {
			socket.on('notification', (message: string) => {
				setNotifications(prev => [...prev, message].slice(-3))
			})
			return () => {
				socket.off('notification')
			}
		}
	}, [tenantConfig, socket])

	// Load saved tenant on mount
	useEffect(() => {
		const savedTenantId = localStorage.getItem('tenantId')
		if (savedTenantId) {
			setTenantId(savedTenantId)
			loadTenantConfig(savedTenantId)
		}
	}, [])

	// Handle tenant selection
	const handleTenantSelect = async (e: React.FormEvent) => {
		e.preventDefault()
		if (tenantId) {
			await loadTenantConfig(tenantId)
		}
	}

	// Clear tenant session
	const clearTenant = () => {
		setTenantId('')
		setTenantConfig(null)
		localStorage.removeItem('tenantId')
		setNotifications([])
	}

	return (
		<div
			className={
				tenantConfig?.theme === 'dark'
					? 'dark bg-gray-900 min-h-screen'
					: 'bg-gray-100 min-h-screen'
			}
		>
			<div className='container mx-auto p-6'>
				{!tenantConfig ? (
					<Card className='max-w-md mx-auto mt-12 shadow-lg'>
						<CardHeader>
							<CardTitle className='text-2xl'>Select Tenant</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleTenantSelect} className='space-y-4'>
								<Input
									value={tenantId}
									onChange={e => setTenantId(e.target.value)}
									placeholder='Enter Tenant ID (e.g., tenant1)'
									className='text-gray-900 dark:text-gray-100'
								/>
								<Button type='submit' disabled={isLoading} className='w-full'>
									{isLoading ? 'Loading...' : 'Load Tenant'}
								</Button>
							</form>
						</CardContent>
					</Card>
				) : (
					<div className='space-y-6'>
						<div className='flex justify-between items-center'>
							<h1 className='text-3xl font-bold'>
								Tenant Dashboard ({tenantId})
							</h1>
							<Button variant='destructive' onClick={clearTenant}>
								Switch Tenant
							</Button>
						</div>

						{/* Dashboard Modules */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{tenantConfig.enableRealtimeChat && (
								<Card className='shadow-md'>
									<CardHeader>
										<CardTitle>Real-Time Chat</CardTitle>
									</CardHeader>
									<CardContent>
										<p>Engage in real-time conversations with your team.</p>
									</CardContent>
								</Card>
							)}
							<Card className='shadow-md'>
								<CardHeader>
									<CardTitle>Analytics</CardTitle>
								</CardHeader>
								<CardContent>
									<p>View tenant analytics and performance metrics.</p>
								</CardContent>
							</Card>
						</div>

						{/* Notifications */}
						{tenantConfig.enableNotifications && (
							<div className='fixed bottom-4 right-4 space-y-2'>
								{notifications.map((note, index) => (
									<Notification key={index} message={note} />
								))}
							</div>
						)}
					</div>
				)}
				<Toaster />
			</div>
		</div>
	)
}
