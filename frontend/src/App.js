import React, {useState, useEffect, Component} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import { Icon } from "leaflet";
import axios from "axios";

const client = axios.create({
  baseURL: "api/"
})
export default function App() {
  const [bin, setBin] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function getBin() {
      await client.get('bin/')
      .then((response) => {
        setBin(response.data);
      })
      .catch(error => {
        setError(error);
      });
    }
    getBin();
  }, []);
  
  if (error) return `Error : ${error.message}`;
  if (!bin) return null;

  return (
    <div className="container-fluid px-0">
      <MapContainer center={[13.2848334, 100.9179506]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bin.map(bin => (
          <Marker key={bin.id} position={[bin.lat, bin.lng]}></Marker>
        ))}
      </MapContainer>
    </div>
  )
}
