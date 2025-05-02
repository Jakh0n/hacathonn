import Navbar from '@/components/shared/navbar'
import { ChildProps } from '@/types'

const Layout = ({ children }: ChildProps) => {
	return (
		<div>
			<main>
				<Navbar />
				{children}
			</main>
		</div>
	)
}

export default Layout
