import { Button } from '@/components/ui/button'
import { Tenant } from '@/types'

interface SideBarProps {
	setTenantId: (tenantId: string) => void
	tenant: Tenant
}

const SideBar = ({ setTenantId, tenant }: SideBarProps) => {
	return (
		<aside className='w-64 max-sm:hidden mt-20  p-2 border-r border-gray-200 rounded-lg'>
			<h2
				className={`text-2xl font-bold mb-6  ${
					tenant.config.theme === 'dark' ? 'text-white' : 'text-black'
				} font-spaceGrotesk`}
			>
				Tenant Menu
			</h2>
			<nav>
				<ul className='space-y-4'>
					<li>
						<Button
							variant='outline'
							onClick={() => setTenantId('tenant1')}
							className='w-full justify-start bg-gray-100  text-black hover:text-white hover:bg-indigo-600'
						>
							Tenant 1
						</Button>
					</li>
					<li>
						<Button
							variant='outline'
							onClick={() => setTenantId('tenant2')}
							className='w-full justify-start bg-gray-100  text-black hover:text-white hover:bg-indigo-600'
						>
							Tenant 2
						</Button>
					</li>
				</ul>
			</nav>
		</aside>
	)
}

export default SideBar
