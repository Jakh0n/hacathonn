import { Button } from '@/components/ui/button'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface SelectTenantProps {
	setTenantId: (tenantId: string) => void
	tenantId: string
	isLoading: boolean
	handleTenantSelect: (e: React.FormEvent<HTMLFormElement>) => void
}

const SelectTenant = ({
	setTenantId,
	tenantId,
	isLoading,
	handleTenantSelect,
}: SelectTenantProps) => {
	return (
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
	)
}

export default SelectTenant
