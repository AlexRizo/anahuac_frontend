import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { App } from './App.jsx'
import './index.css'
import './App.css'
import 'animate.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './providers/queryClient.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={ store }>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  // </StrictMode>,
)
