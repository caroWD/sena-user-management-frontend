import { Outlet } from 'react-router'
import AuthHeader from './header'

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <div className="flex min-h-[calc(100svh-4rem)] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AuthLayout
