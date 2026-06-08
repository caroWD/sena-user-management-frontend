import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import ModeToggle from '../global/mode-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { Button } from '../ui/button'
import { ButtonGroup, ButtonGroupSeparator } from '../ui/button-group'
import { SidebarTrigger } from '../ui/sidebar'
import { useLocation, useNavigate } from 'react-router'

const DashboardHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const paths = location.pathname.split('/').filter((path) => path)

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 px-4">
      <SidebarTrigger variant="outline" className="-ml-1" />
      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          {!paths.length ? (
            <BreadcrumbItem>
              <BreadcrumbPage>Panel de control</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            paths.map((path, index, array) => {
              const parsedPath = (
                path.at(0)?.toUpperCase() + path.substring(1).toLowerCase()
              )
                .split('-')
                .join(' ')

              return index < array.length - 1 ? (
                <>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">{parsedPath}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{parsedPath}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-2">
        <ButtonGroup>
          <Button variant="outline" size="icon-sm" onClick={() => navigate(-1)}>
            <IconChevronLeft />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="outline" size="icon-sm" onClick={() => navigate(1)}>
            <IconChevronRight />
          </Button>
        </ButtonGroup>
        <ModeToggle variant="outline" size="icon-sm" />
      </div>
    </header>
  )
}

export default DashboardHeader
