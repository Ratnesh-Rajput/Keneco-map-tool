import React, { useEffect, useState } from 'react'
import { getPolygons } from '../api/Polygon'
import PolygonMap from '../components/PolygonMap'

export default function PolygonListPage() {
  const [polygons, setPolygons] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchPolygons = async () => {
      try {
        const res = await getPolygons()
        setPolygons(res.data)
      } catch (err) {
        console.error('Error fetching polygons:', err)
      }
    }

    fetchPolygons()
  }, [])

  return (
    <div className="h-screen w-full flex flex-col bg-[#f8f8f8]">
      {/* Header */}
      <div className="bg-[#2f4a2f] text-white p-4 flex items-center">
        <div className="font-bold text-xl ml-2"> KENECO</div>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left: List */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Find the new projects from the below list to send interest
          </h2>

          {polygons.length === 0 ? (
            <p className="text-gray-500">No polygons saved yet.</p>
          ) : (
            <div className="space-y-4">
              {polygons.map((p) => (
                <div
                  key={p.id}
                  className={`flex border rounded-lg shadow-md bg-white overflow-hidden ${
                    selected?.id === p.id ? 'border-green-500' : ''
                  }`}
                >
                  {/* Image */}
                  {/* <div className="w-32 h-32 bg-cover bg-center" style={{ backgroundImage: `url('/images/project.jpg')` }} /> */}

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-lg mb-2">Project Ken Eco</h3>
                    <div className="text-sm text-gray-600 mb-1"><strong>Land Restoration Type:</strong> Afforestation/Resforestation</div>
                    <div className="text-sm text-gray-600 mb-1"><strong>Registry:</strong> Verra</div>
                    <div className="text-sm text-gray-600 mb-1"><strong>Project Stage:</strong> Pre-feasibility</div>
                    <div className="text-sm text-gray-600 mb-1"><strong>Size:</strong> {(p.area / 10000).toFixed(0)} ha</div>
                    <div className="text-sm text-gray-600 mb-3"><strong>Location:</strong> India</div>
                    <button
                      onClick={() => setSelected(p)}
                      className="px-4 py-1 bg-green-100 border border-green-600 text-green-800 rounded hover:bg-green-200"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Map */}
        <div className="w-1/2 hidden md:block">
          {selected && (
            <PolygonMap
              polygon={{
                type: 'Polygon',
                coordinates: [selected.coordinates.map((p) => [p.lng, p.lat])],
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
