'use client'
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
	return (
		<div className='fixed z-40 w-full bg-gray-300 shadow-lg p-4 border-b h-[10vh] backdrop-blur-lg bg-white/30  border-gray-500 rounded-lg '>
			<nav className=' flex justify-between  items-center '>
				<div className='flex  items-center'>
					<h1 className='text-xl max-sm:hidden font-semibold text-indigo-400  mr-2'>
						Dashboard
					</h1>
					<div className='relative max-sm:absolute max-sm:top-3 max-sm:left-0 max-sm:w-full max-sm:z-10'>
						<select
							value={tenantId}
							onChange={e => setTenantId(e.target.value)}
							className='p-2 rounded-lg bg-gray-700 text-white border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
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
				<div>
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
