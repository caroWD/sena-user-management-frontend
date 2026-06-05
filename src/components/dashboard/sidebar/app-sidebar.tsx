import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  IconCategory,
  IconDashboard,
  IconHelp,
  IconSearch,
  IconSettings,
  IconTags,
  IconUsers,
  IconUsersGroup,
  IconUsersPlus,
} from '@tabler/icons-react'
import type { ComponentProps } from 'react'
import { NavLink } from 'react-router'
import NavUser from './nav-user'
import NavSecondary from './nav-secondary'
import NavMain from './nav-main'

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="#" viewTransition>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconUsersPlus className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">UserManagementApp</span>
                  <span className="text-xs leading-tight">v1.0.0</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: 'Panel de control',
              url: '/',
              icon: IconDashboard,
            },
            {
              title: 'Usuarios',
              url: '#',
              icon: IconUsers,
            },
            {
              title: 'Equipos',
              url: '#',
              icon: IconUsersGroup,
            },
            {
              title: 'Categorias',
              url: '#',
              icon: IconCategory,
            },
            {
              title: 'Etiquetas',
              url: '#',
              icon: IconTags,
            },
          ]}
        />
        <NavSecondary
          items={[
            {
              title: 'Configuración',
              url: '#',
              icon: IconSettings,
            },
            {
              title: 'Soporte',
              url: '#',
              icon: IconHelp,
            },
            {
              title: 'Buscar',
              url: '#',
              icon: IconSearch,
            },
          ]}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: 'shadcn',
            email: 'm@example.com',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
