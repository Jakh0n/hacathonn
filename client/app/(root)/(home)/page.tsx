'use client'

import TenantSelector from '@/app/_components/tenant-selector'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Home = () => {
	const [tenantId, setTenantId] = useState<string | null>(null)
	const router = useRouter()

	const handleTenantSelect = (tenantId: string) => {
		setTenantId(tenantId)
		router.push(`/dashboard?tenant=${tenantId}`) // Navigates to the dashboard of the selected tenant
	}

	return (
		<div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-green-500'>
			{!tenantId ? (
				<TenantSelector onSelect={handleTenantSelect} />
			) : (
				<p className='text-white'>You have selected {tenantId}</p>
			)}
		</div>
	)
}

export default Home
