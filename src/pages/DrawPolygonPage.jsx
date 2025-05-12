import React, { useState, useRef } from 'react'
import {
  GoogleMap,
  DrawingManager,
  Polygon,
  useJsApiLoader,
} from '@react-google-maps/api'
import { submitPolygon } from '../api/Polygon'

const center = {
  lat: 37.7749,
  lng: -122.4194,
}

export default function DrawPolygonPage() {
  const [path, setPath] = useState([])
  const [area, setArea] = useState(null)
  const [perimeter, setPerimeter] = useState(null)
  const polygonRef = useRef(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your key
    libraries: ['drawing', 'geometry'],
  })

  const onPolygonComplete = (polygon) => {
    const coords = polygon.getPath().getArray().map((p) => ({
      lat: p.lat(),
      lng: p.lng(),
    }))
    setPath(coords)

    const geometry = window.google.maps.geometry.spherical
    setArea(geometry.computeArea(polygon.getPath()))
    setPerimeter(geometry.computeLength(polygon.getPath()))

    polygon.setMap(null)
    polygonRef.current = polygon
  }

  const handleSubmit = async () => {
    if (!path.length || !area || !perimeter) return alert('Draw a polygon first.')

    try {
      console.log("TEst")
      await submitPolygon({ coordinates: path })
      alert('Polygon saved!')
    } catch (err) {
      console.error(err)
      alert('Failed to save polygon.')
    }
  }

  if (!isLoaded) {
    return <div className="text-center mt-10 text-gray-600">Loading map...</div>
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col overflow-x-hidden items-center px-4 py-6 w-screen md:px-10 lg:px-20">
      <div className="w-full max-w-7xl flex flex-col gap-3">
        {/* Header */}
        <header className="w-full">
          <h1 className="!text-2xl !md:text-3xl font-bold text-[#2f3e2e]">
            Draw Polygon
          </h1>
        </header>

        {/* Map Card */}
        <section className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col gap-4">
          <div className="w-full h-[60vh] rounded-lg overflow-hidden p-3">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={10}
            >
              <DrawingManager
                onPolygonComplete={onPolygonComplete}
                options={{
                  drawingControl: true,
                  drawingControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_TOP,
                    drawingModes: ['polygon'],
                  },
                  polygonOptions: {
                    fillColor: '#4f46e5',
                    strokeColor: '#4f46e5',
                    fillOpacity: 0.4,
                    strokeWeight: 2,
                  },
                }}
              />
              {path.length > 0 && (
                <Polygon
                  path={path}
                  options={{
                    fillColor: '#22c55e',
                    fillOpacity: 0.5,
                    strokeColor: '#22c55e',
                    strokeWeight: 2,
                  }}
                />
              )}
            </GoogleMap>
          </div>
        </section>

        {/* Area & Perimeter Display */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t-5 border-gray-200 pt-4">
          <div className="flex flex-col text-sm md:text-base text-gray-800 gap-1">
            {area && (
              <p>
                <strong>Area:</strong> {(area / 10000).toFixed(2)} ha
              </p>
            )}
            {perimeter && (
              <p>
                <strong>Perimeter:</strong> {perimeter.toFixed(2)} m
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-700 text-black rounded-md hover:bg-green-800 transition duration-200"
        >
          Submit Polygon
        </button>
      </div>
    </div>
  )
}
