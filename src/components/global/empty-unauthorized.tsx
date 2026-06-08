import { IconArrowUpRight, IconUserOff } from '@tabler/icons-react'
import EmptyTemplate from './empty-template'

const EmptyUnauthorized = () => {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <EmptyTemplate
        header={{
          title: 'No autorizado',
          icon: IconUserOff,
          description:
            'Acceso no permitido. Debe iniciar sesión o crear una cuenta.',
        }}
        buttons={[
          {
            key: 1,
            label: 'Iniciar sesión',
            path: '/auth',
          },
          {
            key: 2,
            label: 'Crear cuenta',
            path: '/auth/register',
            variant: 'outline',
          },
        ]}
        action={{
          label: 'Saber más',
          path: '#',
          variant: 'link',
          icon: IconArrowUpRight,
        }}
        className="max-w-sm border border-solid"
      />
    </div>
  )
}

export default EmptyUnauthorized
