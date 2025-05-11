// src/api/polygons.js
import axios from 'axios'

const BASE_URL = import.meta.env.BACKEND_URL || 'http://localhost:8000/api/polygons/'

/**
 * Fetch all saved polygons from the backend.
 */
export const getPolygons = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

/**
 * Submit a new polygon with its metrics.
 * @param {Object} data - { coordinates: [], area: number, perimeter: number }
 */
export const submitPolygon = async (data) => {
  const rawCoords = data.coordinates.map(coord => [coord.lng, coord.lat]);
  if (rawCoords[0][0] !== rawCoords[rawCoords.length - 1][0] ||
    rawCoords[0][1] !== rawCoords[rawCoords.length - 1][1]) {
    rawCoords.push(rawCoords[0]);
  }
  const geoJsonData = {
    geometry: {
      type: 'Polygon',
      coordinates: [rawCoords]
    }
  }
  console.log(geoJsonData)
  const response = await axios.post(BASE_URL, geoJsonData)
  return response.data
}

