import React, {useState, useEffect, Component} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import { Icon } from "leaflet";
import axios from "axios";
import DatePicker, { registerLocale, setDefaultLocale} from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', ptBR)

const client = axios.create({
  baseURL: "api/"
})

export default function App() {
  const [bin, setBin] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

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
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          AddBin
        </button>
      </div>
      <div className="modal fade bd-example-modal-xl" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog-centered modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Rubbish bin location</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputLatitude">Latitude</label>
                        <input type="latitude" className="form-control" id="inputLatitude" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputLongitude">Longitude</label>
                        <input type="longitude" className="form-control" id="inputLongitude" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputLocation">Location</label>
                      <input type="text" className="form-control" id="inputLocation" />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputType">Date</label>
                        <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputType">Time</label>
                        <DatePicker
                          className="form-control"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          locale="pt-BR"
                          showTimeSelect
                          showTimeSelectOnly
                          timeCaption="Time"
                          dateFormat="pp"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputType">Type</label>
                        <input type="type" className="form-control" id="inputType" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputTag">Tag</label>
                        <select id="inputTag" className="form-control">
                          <option selected>Choose...</option>
                          <option>...</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light">Cancel</button>
                <button type="button" className="btn btn-secondary">Clear</button>
                <button type="button" className="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </div>
    </div>//container
  )
}
