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
      
      <div className="button-insert">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          AddBin
        </button>
      </div>
      <div class="modal fade bd-example-modal-xl" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog-centered modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Rubbish bin location</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputLatitude">Latitude</label>
                        <input type="latitude" class="form-control" id="inputLatitude" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputLongitude">Longitude</label>
                        <input type="longitude" class="form-control" id="inputLongitude" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputLocation">Location</label>
                      <input type="text" class="form-control" id="inputLocation" />
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputType">Type</label>
                        <input type="type" class="form-control" id="inputType" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputTag">Tag</label>
                        <select id="inputTag" class="form-control">
                          <option selected>Choose...</option>
                          <option>...</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-md-6">
                      <DatePicker />
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light">Cancel</button>
                <button type="button" class="btn btn-secondary">Clear</button>
                <button type="button" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </div>
    </div>//container
  )
}
