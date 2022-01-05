import React, {useState, Component} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import { Icon } from "leaflet";
import axios from "axios";

export default class App extends Component {
  render() {
    return (
      <div>
         <MapContainer center={[13.2848334, 100.9179506]} zoom={14} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[13.281353, 100.927505]}></Marker>
        </MapContainer>
      </div>
    )
  }
}