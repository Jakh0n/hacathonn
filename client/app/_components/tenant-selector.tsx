import { Button } from '@/components/ui/button'
import { FC } from 'react'

const TenantSelector: FC<{ onSelect: (tenantId: string) => void }> = ({
	onSelect,
}) => {
	return (
		<div className='flex space-x-4'>
			<Button
				variant='outline'
				color='primary'
				onClick={() => onSelect('abc123')}
				className='p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100'
			>
				ABC University
			</Button>
			<Button
				variant='outline'
				color='secondary'
				onClick={() => onSelect('xyz456')}
				className='p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-100'
			>
				XYZ School
			</Button>
		</div>
	)
}

export default TenantSelector
