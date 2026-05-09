import { createRoot } from 'react-dom/client'
import './index.css'
import Workshop from './layout/Workshop'
import { BrowserRouter, Routes, Route } from 'react-router'
import CreateFile from './layout/CreateFile'
import ExportPage from './layout/ExportPage'



createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Workshop />} />
        <Route path="/createfile" element={<CreateFile />} />
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
