// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoadScript } from '@react-google-maps/api'
import DrawPolygonPage from './pages/DrawPolygonPage'
import PolygonListPage from './pages/PolygonListPage'

const App = () => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['drawing', 'geometry']}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/draw" element={<DrawPolygonPage />} />
          <Route path="/saved" element={<PolygonListPage />} />
        </Routes>
      </BrowserRouter>
    </LoadScript>
  )
}

export default App
