import { SidebarProvider, SidebarInset } from '../ui/sidebar'
import AppSidebar from './sidebar/app-sidebar'
import { Outlet } from 'react-router'
import DashboardHeader from './header'

const DashboardLayout = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
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
