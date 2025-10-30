import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SongsProvider } from './context/SongsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SongsProvider>

      <App />

    </SongsProvider>
  </StrictMode>,
)
