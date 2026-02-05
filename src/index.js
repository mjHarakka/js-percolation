import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Visualization from './pages/Visualization'
import Options from './pages/Options'
import About from './pages/About'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="percolation" element={<Visualization />} />
          <Route path="options" element={<Options />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)
