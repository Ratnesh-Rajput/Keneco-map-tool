import React, { useEffect, useState } from 'react'
import { getPolygons } from '../api/Polygon'  
import PolygonMap from '../components/PolygonMap'

export default function PolygonListPage() {
  const [polygons, setPolygons] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchPolygons = async () => {
      try {
        const res = await getPolygons();
        setPolygons(res.data)
      } catch (err) {
        console.error('Error fetching polygons:', err)
      }
    }

    fetchPolygons()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Polygons</h1>

      {polygons.length === 0 ? (
        <p>No polygons saved yet.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {polygons.map(p => (
            <li key={p.id} className="border p-4 rounded shadow">
              <p><strong>Area:</strong> {(p.area / 10000).toFixed(2)} ha</p>
              <p><strong>Perimeter:</strong> {p.perimeter.toFixed(2)} m</p>
              <button
                onClick={() => setSelected(p)}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                View on Map
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Polygon Preview</h2>
          <PolygonMap polygon={selected.coordinates} />
        </div>
      )}
    </div>
  )
}
