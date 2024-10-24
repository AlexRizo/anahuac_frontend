import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { App } from './App.jsx'
import './index.css'
import './App.css'
import 'animate.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  // </StrictMode>,
)
