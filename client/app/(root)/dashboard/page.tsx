'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Toast } from '@/components/ui/toast'
import { Config } from '@/types/config'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Dashboard = ({ tenantId }: { tenantId: string }) => {
	const [config, setConfig] = useState<Config | null>(null)
	const [showToast, setShowToast] = useState(false)

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const response = await axios.get<Config>(
					`http://localhost:5000/api/config/${tenantId}`
				)
				setConfig(response.data)

				if (response.data.enableRealtimeChat) {
					setShowToast(true)
				}
			} catch (error) {
				console.error('Error fetching config:', error)
			}
		}
		fetchConfig()
	}, [tenantId])

	return (
		<div
			className={`${
				config?.theme === 'dark' ? 'bg-gray-900' : 'bg-white'
			} min-h-screen p-8`}
		>
			<h1 className='text-4xl font-bold text-center mb-8'>
				Welcome to {tenantId} Dashboard
			</h1>

			{showToast && <Toast title='New Message' duration={5000} />}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				<Card className='p-6 shadow-xl bg-white'>
					<h2 className='text-2xl font-semibold mb-4'>Configuration</h2>
					<p className='text-lg'>Theme: {config?.theme}</p>
					<p className='text-lg'>
						Real-Time Chat:{' '}
						{config?.enableRealtimeChat ? 'Enabled' : 'Disabled'}
					</p>
				</Card>

				<Card className='p-6 shadow-xl bg-white'>
					<h2 className='text-2xl font-semibold mb-4'>Enable Features</h2>
					<div className='flex items-center space-x-4'>
						<span>Enable Real-Time Chat</span>
						<Switch checked={config?.enableRealtimeChat} disabled />
					</div>
				</Card>

				<Card className='p-6 shadow-xl bg-white'>
					<h2 className='text-2xl font-semibold mb-4'>Actions</h2>
					<Button className='w-full py-3' variant='default'>
						Save Settings
					</Button>
				</Card>
			</div>
		</div>
	)
}

export default Dashboard
