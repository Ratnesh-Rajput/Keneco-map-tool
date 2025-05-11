// src/api/polygons.js
import axios from 'axios'

const BASE_URL = import.meta.env.BACKEND_URL

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
  const response = await axios.post(BASE_URL, data)
  return response.data
}
