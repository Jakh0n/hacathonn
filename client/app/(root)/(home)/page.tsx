'use client'

import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { fetchTenantConfig } from '@/lib/api'
import { useSocket } from '@/lib/socket'
import { cn } from '@/lib/utils'
import { Tenant } from '@/types'
import { useEffect, useState } from 'react'
import DashboardModules from '../_components/dashboard-modules'
import SelectTenant from '../_components/select-tenant'
import SideBar from '../_components/side-bar'

export default function Dashboard() {
	const [tenantId, setTenantId] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
	const { toast } = useToast()
	const socket = useSocket()
	const [tenant, setTenant] = useState<Tenant | null>(null)

	// Fetch tenant configuration
	const loadTenantConfig = async (id: string) => {
		setIsLoading(true)
		try {
			const tenantData = await fetchTenantConfig(id)
			setTenant(tenantData)
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
		if (socket && tenant?.config.enableNotifications) {
			socket.on('notification', (message: string) => {
				toast({
					title: 'Notification',
					description: message,
					variant: 'default',
					className:
						tenant.config.theme === 'dark'
							? 'bg-gray-800 text-white border-gray-600'
							: 'bg-white text-gray-900 border-gray-200',
				})
			})

			return () => {
				socket.off('notification')
			}
		}
	}, [socket, tenant?.config.enableNotifications])

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
		setTenant(null)
		localStorage.removeItem('tenantId')
	}

	return (
		<div
			className={cn(
				'h-full',
				tenant?.config.theme === 'dark'
					? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
					: 'bg-gradient-to-br from-blue-50 via-gray-100 to-white'
			)}
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
			<div className='flex h-full'>
				{/* Sidebar */}
				{tenant && <SideBar setTenantId={setTenantId} tenant={tenant} />}
				{/* Main Content */}
				<main className='flex-1 p-6 mt-16'>
					{!tenant ? (
						<SelectTenant
							setTenantId={setTenantId}
							tenantId={tenantId}
							isLoading={isLoading}
							handleTenantSelect={handleTenantSelect}
						/>
					) : (
						<div>
							<h1
								className={`text-2xl font-semibold font-spaceGrotesk animate-fade-in space-grotesk mb-4 ${
									tenant.config.theme === 'dark' ? 'text-white' : 'text-black'
								}`}
							>
								Welcome to {tenant.name} Dashboard
							</h1>
							<DashboardModules tenant={tenant} />
						</div>
					)}
					<Toaster />
				</main>
			</div>
		</div>
	)
}
