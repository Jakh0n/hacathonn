'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendIcon } from 'lucide-react'

const CommentInput = () => {
	return (
		<div className='flex items-center gap-2 mt-2'>
			<div className='flex-1 flex items-center '>
				<Input
					placeholder='Add a comment...'
					className='rounded-md rounded-r-none focus-visible:ring-0 '
				/>
				<Button size='icon' className='rounded-l-none'>
					<SendIcon className='w-4 h-4' />
				</Button>
			</div>
		</div>
	)
}

export default CommentInput
