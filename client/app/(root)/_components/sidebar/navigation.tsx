'use client'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { navigation_items } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Navigation = () => {
	const pathname = usePathname()
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Navigation</SidebarGroupLabel>
			<SidebarMenu>
				{navigation_items.map(item => (
					<SidebarMenuItem
						key={item.label}
						className={cn(
							'rounded-md hover:bg-primary-foreground',
							pathname === item.href && 'bg-primary/40'
						)}
					>
						<SidebarMenuButton asChild>
							<Link href={item.href}>
								<item.icon />
								<div className='flex items-center gap-2'>
									<p className='text-sm font-medium'>{item.label}</p>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
export default Navigation
