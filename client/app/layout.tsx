import type { Metadata } from 'next'
import { Montserrat, Space_Grotesk } from 'next/font/google'
import './globals.css'
const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'SaaS Tenant Dashboard',
	description: 'Multi-tenant admin panel for SaaS',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={`${montserrat.variable} ${spaceGrotesk.variable} font-sans`}
			>
				<div className='bg-white'>{children}</div>
			</body>
		</html>
	)
}
