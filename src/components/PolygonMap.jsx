import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Polygon } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '60vh',
}

export default function PolygonMap({ polygon }) {
  if (!polygon || polygon.length === 0) return null

  const center = polygon[0]

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      <Polygon
        path={polygon}
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
  polygon: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    })
  ).isRequired
}
