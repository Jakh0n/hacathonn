import { Button } from '@/components/ui/button'

const SideBar = ({
	setTenantId,
}: {
	setTenantId: (tenantId: string) => void
}) => {
	return (
		<>
			<aside className='w-64 bg-gray-800 text-white p-4 shadow-2xl'>
				<h2 className='text-2xl font-bold mb-6 text-indigo-400'>Tenant Menu</h2>
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
		</>
	)
}

export default SideBar
