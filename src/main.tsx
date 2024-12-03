import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { client } from './config/query-client.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <QueryClientProvider client={client}>
      <ConfigProvider theme={{ token: { colorPrimary: "#bc8e5b" } }}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
