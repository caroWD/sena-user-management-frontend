import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from '../theme-provider'
import { Button } from '../ui/button'
import type { ComponentProps } from 'react'

const ModeToggle = ({ ...props }: ComponentProps<typeof Button>) => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      {...props}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <IconSun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <IconMoon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ModeToggle
