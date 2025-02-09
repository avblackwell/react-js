import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { RouterProvider, createHashHistory, createRouter, Link } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routeTree } from './routeTree.gen'
import { NotFoundTitle } from './components/NotFoundTitle'
import '@mantine/core/styles.css'

const hashHistory = createHashHistory()
const router = createRouter({
  routeTree,
  history: hashHistory,
  defaultNotFoundComponent: () => {
    return (
      <>
      <NotFoundTitle />
      </>
    )
  },
})
const queryClient = new QueryClient()

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
)
