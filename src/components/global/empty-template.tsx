import { IconUserOff, type Icon } from '@tabler/icons-react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'
import { Button } from '../ui/button'
import { Link, NavLink } from 'react-router'
import type { ComponentProps } from 'react'

type TemplateHeader = {
  title: string
  icon?: Icon
  description?: string
}

type TemplateButton = {
  key: number
  label: string
  path: string
  variant?:
    | 'link'
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | null
}

type TemplateAction = {
  label: string
  path: string
  variant?:
    | 'link'
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | null
  icon?: Icon
}

interface EmptyTemplateProps {
  header: TemplateHeader
  buttons: TemplateButton[]
  action?: TemplateAction
}

const EmptyTemplate = ({
  header: { title, icon, description },
  buttons,
  action,
  ...props
}: EmptyTemplateProps & ComponentProps<typeof Empty>) => {
  return (
    <Empty {...props}>
      <EmptyHeader>
        {icon && (
          <EmptyMedia variant="icon">
            <IconUserOff />
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        {description && (
          <EmptyDescription>
            Acceso no autorizado. Debes iniciar tu sesión o crear una cuenta.
          </EmptyDescription>
        )}
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        {buttons.map((button) => (
          <NavLink key={button.key} to={button.path} viewTransition>
            <Button variant={button.variant}>{button.label}</Button>
          </NavLink>
        ))}
      </EmptyContent>
      {action && (
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <Link to={action.path}>
            {action.label} {action.icon && <action.icon />}
          </Link>
        </Button>
      )}
    </Empty>
  )
}

export default EmptyTemplate
