import React, { useEffect, useState } from 'react'
import { getPolygons } from '../api/Polygon'
import PolygonMap from '../components/PolygonMap'

// Helper function to parse WKT geometry
const parseWKTGeometry = (wktString) => {
  // Remove SRID prefix if present
  const geometryString = wktString.replace('SRID=4326;', '')
  // Extract coordinates from POLYGON ((...))
  const coordsMatch = geometryString.match(/\(\((.*?)\)\)/)
  if (!coordsMatch) return null
  
  const coords = coordsMatch[1].split(',').map(coord => {
    const [lng, lat] = coord.trim().split(' ').map(Number)
    return { lng, lat }
  })
  
  return coords
}

export default function PolygonListPage() {
  const [polygons, setPolygons] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchPolygons = async () => {
      try {
        const res = await getPolygons()
        setPolygons(res)
        // Set the first polygon as selected if there are any polygons
        if (res.length > 0) {
          setSelected(res[0])
        }
      } catch (err) {
        console.error('Error fetching polygons:', err)
      }
    }

    fetchPolygons()
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f8f8f8] overflow-hidden">
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: List */}
        <div className="w-full md:w-1/2 p-4 overflow-hidden">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Find the new projects from the below list to send interest
          </h2>

          {polygons.length === 0 ? (
            <p className="text-gray-500">No polygons saved yet.</p>
          ) : (
            <div className="space-y-4 m-5 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
              {polygons.map((p) => (
                <div
                  key={p.id}
                  className={`flex border !m-5 rounded-lg shadow-md bg-white overflow-hidden ${
                    selected?.id === p.id ? 'border-green-500' : ''
                  }`}
                >
                  {/* Image */}
                  {/* <div className="w-32 h-32 bg-cover bg-center" style={{ backgroundImage: `url('/images/project.jpg')` }} /> */}

                  {/* Content */}
                  <div className="flex-1 p-5 ">
                   <div className="flex justify-between">
                    <h3 className="font-semibold text-lg text-black !ml-2 !mt-1">Project Ken Eco</h3>
                    <button
                      onClick={() => setSelected(p)}
                      className="px-2 py-1 !m-2 bg-green-100 border border-green-600 text-green-800 rounded hover:bg-green-200"
                    >
                      Details
                    </button>
                   </div>

                    
                    <div className="text-sm text-gray-600 !m-2">
                      <strong>Size:</strong> {p.area.toFixed(2)} ha
                    </div>
                    <div className="text-sm text-gray-600 !m-2">
                      <strong>Perimeter:</strong> {p.perimeter.toFixed(2)} m
                    </div>
                    <div className="text-sm text-gray-600 !m-2">
                      <strong>Created:</strong> {new Date(p.created_at).toLocaleDateString()}
                    </div>
                    
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Map */}
        <div className="w-1/2 hidden md:block !mt-13">
          {selected && (
            <PolygonMap
              polygon={{
                type: 'Polygon',
                coordinates: [parseWKTGeometry(selected.geometry).map(({ lng, lat }) => [lng, lat])]
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
