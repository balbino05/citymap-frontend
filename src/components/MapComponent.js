import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ points }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map(point => (
        <Marker key={point.id} position={[point.latitude, point.longitude]}>
          <Popup>
            {point.name} <br /> {point.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
