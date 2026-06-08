import { SidebarProvider, SidebarInset } from '../ui/sidebar'
import AppSidebar from './sidebar/app-sidebar'
import { Outlet } from 'react-router'
import DashboardHeader from './header'
import { useProfileStore } from '@/stores/use-profile-store'
import EmptyUnauthorized from '../global/empty-unauthorized'

const DashboardLayout = () => {
  const token = useProfileStore((state) => state.token)

  return !token || !token.accessToken ? (
    <EmptyUnauthorized />
  ) : (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar token={token.accessToken} />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
