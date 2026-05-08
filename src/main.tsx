import { createRoot } from 'react-dom/client'
import './index.css'
import Workshop from './layout/Workshop'
import { BrowserRouter, Routes, Route } from 'react-router'
import CreateFile from './layout/CreateFile'



createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Workshop />} />
        <Route path="/createfile" element={<CreateFile />} />
      </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
