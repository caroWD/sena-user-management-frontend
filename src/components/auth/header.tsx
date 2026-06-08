import { IconUsersPlus } from '@tabler/icons-react'
import { NavLink } from 'react-router'
import ModeToggle from '../global/mode-toggle'

const AuthHeader = () => {
  return (
    <header className="py-4">
      <div className="flex items-center justify-between gap-4 px-4">
        <NavLink to="/" viewTransition className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-sm bg-primary">
            <IconUsersPlus size={18} stroke={2.5} color="white" />
          </div>
          <h1 className="font-bold">UserManagementApp</h1>
        </NavLink>
        <ModeToggle variant="outline" size="icon-sm" />
      </div>
    </header>
  )
}

export default AuthHeader
