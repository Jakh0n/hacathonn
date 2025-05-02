import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
import Navigation from './navigation'

export async function AppSidebar() {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader />
			<SidebarContent>
				<Navigation />
			</SidebarContent>
		</Sidebar>
	)
}
