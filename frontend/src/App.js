import React, {useState, useEffect, Component} from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from 'react-leaflet';
import { Icon } from "leaflet";
import axios from "axios";
import './App.css';

import { Button, Collapse, Card } from 'react-bootstrap';
import { ModalForm } from './components/modal-form/App';

export default function App() {
  const [bins, setBins] = useState([]);
  const [error, setError] = useState(null);
  const [criteria, setCriteria] = useState({});

  const [showModalForm, setShowModalForm] = useState(false);

  useEffect(() => {
    async function getBins() {
      await axios.get('api/bin/')
      .then((response) => {
        setBins(response.data);
      })
      .catch(error => {
        setError(error);
      });
    }
    getBins();
  }, [showModalForm]);
  
  const handleModalOpen = () => {
    console.log("Open!")
    setShowModalForm(true)
  }

  const hideModal = e => {
    setShowModalForm(false)
  }

  const handleOk = () =>{
    setShowModalForm(false)
  }

  if (error) return `Error : ${error.message}`;

  return (
    <div className="container-fluid px-0">
       <MapContainer center={[13.2848334, 100.9179506]} zoom={14} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bins.map(bin => (
          <Marker key={bin.id} position={[bin.lat, bin.lng]} 
            eventHandlers={{
              click: (e) => {
                console.log('marker clicked', bin)
                
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
      
      <ModalForm show={showModalForm} handleClose={hideModal}/>
      <Button className="button-insert" variant="primary" onClick={handleModalOpen}>Add Bin</Button>
    </div>//container
  )
}
