'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

interface NavbarProps {
	tenantId: string
	setTenantId: (id: string) => void
	isLoading: boolean
	handleTenantSelect: (e: React.FormEvent) => Promise<void>
	clearTenant: () => void
}
const Navbar = ({
	tenantId,
	setTenantId,
	isLoading,
	handleTenantSelect,
	clearTenant,
}: NavbarProps) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	return (
		<div>
			<nav className='bg-gray-800 dark:bg-gray-900 shadow-lg p-4 flex justify-between items-center'>
				<div className='flex items-center'>
					<h1 className='text-xl font-bold text-indigo-400 mr-4'>
						Tenant Dashboard
					</h1>
					<div className='relative'>
						<select
							value={tenantId}
							onChange={e => setTenantId(e.target.value)}
							className='p-2 rounded-lg bg-gray-700 text-white border-2 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
						>
							<option value=''>Select Tenant</option>
							<option value='tenant1'>Tenant 1</option>
							<option value='tenant2'>Tenant 2</option>
						</select>
						<Button
							onClick={handleTenantSelect}
							disabled={isLoading}
							className='ml-2 py-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors'
						>
							{isLoading ? 'Loading...' : 'Load'}
						</Button>
					</div>
				</div>
				<div className='md:hidden'>
					<Button
						variant='ghost'
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className='text-white'
					>
						{isMobileMenuOpen ? 'Close' : 'Menu'}
					</Button>
				</div>
				<div
					className={`md:flex ${
						isMobileMenuOpen ? 'block' : 'hidden'
					} md:space-x-4`}
				>
					<Button
						variant='destructive'
						onClick={clearTenant}
						className='py-2 px-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors'
					>
						Switch Tenant
					</Button>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
