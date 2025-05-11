import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Polygon } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '60vh',
}

export default function PolygonMap({ polygon }) {
  if (!polygon || !polygon.coordinates || polygon.coordinates[0].length === 0) return null

  // Convert GeoJSON coordinates to Google Maps format
  const path = polygon.coordinates[0].map(coord => ({
    lat: coord[1],
    lng: coord[0]
  }))

  const center = path[0]

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      <Polygon
        path={path}
        options={{
          fillColor: '#f87171',
          fillOpacity: 0.4,
          strokeColor: '#ef4444',
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  )
}

PolygonMap.propTypes = {
  polygon: PropTypes.shape({
    type: PropTypes.oneOf(['Polygon']).isRequired,
    coordinates: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number)
      )
    ).isRequired
  }).isRequired
}
