import { createBrowserRouter } from 'react-router'
import App from './pages/App'
import DashboardLayout from './components/dashboard/dashboard-layout'

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: App,
      },
    ],
  },
])
