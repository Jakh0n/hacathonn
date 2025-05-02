import { X } from 'lucide-react'

import { SearchIcon } from 'lucide-react'

import { Button } from '../ui/button'

import { Input } from '../ui/input'
const Search = () => {
	return (
		<form className='flex items-center lg:w-1/3 max-w-full relative '>
			<Input
				type='text'
				placeholder='Search'
				className='rounded-r-none focus-visible:ring-0 '
			/>
			{
				<X
					size={16}
					className='absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer'
				/>
			}
			<Button
				type='submit'
				variant='secondary'
				size='icon'
				className='rounded-l-none '
			>
				<SearchIcon />
			</Button>
		</form>
	)
}

export default Search
