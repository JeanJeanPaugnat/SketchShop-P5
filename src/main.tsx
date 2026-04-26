import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Workshop from './pages/Workshop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Workshop />
  </StrictMode>,
)
