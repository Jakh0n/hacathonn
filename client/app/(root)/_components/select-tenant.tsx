import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SelectTenantProps {
	setTenantId: (tenantId: string) => void
	tenantId: string
	isLoading: boolean
	handleTenantSelect: (tenantId: string) => void
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
				<select
					value={tenantId}
					onChange={e => {
						const value = e.target.value
						setTenantId(value)
						handleTenantSelect(value)
					}}
					className='w-full p-3 text-lg text-gray-900 dark:text-gray-100 border-2 border-indigo-300 dark:border-indigo-600 rounded-lg focus:ring-2 focus:ring-indigo-500'
					disabled={isLoading}
				>
					<option value=''>Select Tenant</option>
					<option value='tenant1'>Tenant 1</option>
					<option value='tenant2'>Tenant 2</option>
				</select>
			</CardContent>
		</Card>
	)
}

export default SelectTenant
