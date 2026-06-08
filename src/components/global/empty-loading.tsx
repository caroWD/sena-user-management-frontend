import type { ComponentProps } from 'react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '../ui/empty'
import { Spinner } from '../ui/spinner'

const EmptyLoading = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <Empty className="size-20">
        <EmptyHeader className="hidden">
          <EmptyTitle>Cargando</EmptyTitle>
          <EmptyDescription>
            Por favor, espere mientras procesamos su solicitud. No actualice la
            página.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Spinner className="size-14" />
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default EmptyLoading
