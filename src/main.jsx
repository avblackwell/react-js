import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { createTheme, MantineProvider } from '@mantine/core'
import App from './App'

// import '@mantine/core/styles.css'
// import VirtualTable from './components/VirtualTable.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <MantineProvider> */}
      <QueryClientProvider client={queryClient}>
        <App />
          {/* <VirtualTable /> */}
      </QueryClientProvider>
    {/* </MantineProvider> */}
  </StrictMode>
)
