import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/points')
      .then(response => {
        console.log('Dados recebidos:', response.data);
        setPoints(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <MapContainer center={[34.05, -118.25]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map(point => (
        <Marker key={point.id} position={[point.latitude, point.longitude]}>
            {point.name}<br />{point.address}
          <Popup>
            {point.name}<br />{point.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
