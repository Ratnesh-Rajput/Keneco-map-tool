// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { LoadScript } from '@react-google-maps/api'
import DrawPolygonPage from './pages/DrawPolygonPage'
import PolygonListPage from './pages/PolygonListPage'

const App = () => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['drawing', 'geometry']}
    >
      <Router>
        <div className="min-h-screen bg-[#f8f8f8]">
          {/* Navigation Header */}
          <div className="bg-[#2f4a2f] text-white p-4  flex  justify-between items-center overflow-x-hidden">
            <div className="font-bold text-4xl !mt-4 !mb-4 ">KEN ECO</div>
            <nav className="space-x-4">
              <Link to="/" className="!px-4 !py-2 rounded !text-white hover:bg-green-700 transition-colors">
                View Projects
              </Link>
              <Link to="/draw" className="!px-4 !py-2 rounded !text-white hover:bg-green-700 transition-colors">
                Draw New Project
              </Link>
            </nav>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<PolygonListPage />} />
            <Route path="/draw" element={<DrawPolygonPage />} />
          </Routes>
        </div>
      </Router>
    </LoadScript>
  )
}

export default App
