import { createBrowserRouter } from 'react-router'
import App from './pages/App'
import DashboardLayout from './components/dashboard/layout'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'

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
  {
    path: 'auth',
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
])
