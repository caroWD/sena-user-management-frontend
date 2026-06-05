import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { RouterProvider } from 'react-router'
import { routes } from './routes.ts'
import { TooltipProvider } from './components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={routes} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
