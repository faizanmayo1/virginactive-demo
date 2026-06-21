import { BrowserRouter, useRoutes } from 'react-router-dom'

import { ToastProvider } from '@/components/ui/toast'
import { routes } from '@/routes'

function AppRoutes() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  )
}
