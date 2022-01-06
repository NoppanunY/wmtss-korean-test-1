import React, {useState, useEffect, Component} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import { Icon } from "leaflet";
import axios from "axios";
import DatePicker, { registerLocale, setDefaultLocale} from "react-datepicker";
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR)

export default function App() {

  const [bin, setBin] = useState(null);
  const [error, setError] = useState(null);
  const [tag, setTag] = useState(null);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [tagSelected, setTagSelected] = useState(null);

  useEffect(() => {
    async function getBin() {
      await axios.get('api/bin/')
      .then((response) => {
        setBin(response.data);
      })
      .catch(error => {
        setError(error);
      });
    }
    async function getTag(){
      await axios.get('api/tag/')
      .then((response) => {
        setTag(response.data);
        setTagSelected(response.data[0].id);
      })
      .catch(error => {
        setError(error);
      })
    }
    getBin();
    getTag();
  }, []);
  
  function insertBin(){
    console.log(tagSelected);
    axios.post('api/bin/',{
      "lat": lat,
      "lng": lng,
      "location": location,
      "type": type,
      "date": Moment(date).format('YYYY-DD-MM'),
      "time": Moment(time).format('hh:mm:ss'),
      "description": description,
      "tag": tagSelected
    })
    .then(() => {
      console.log("Success!");
    })
  }

  if (error) return `Error : ${error.message}`;
  if (!bin || !tag) return null;

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
          Add Bin
        </button>
      </div>
      <div className="modal fade bd-example-modal-xl" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                        <input type="latitude" className="form-control" id="inputLatitude" onChange={(event) => { setLat(event.target.value)}}/>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputLongitude">Longitude</label>
                        <input type="longitude" className="form-control" id="inputLongitude" onChange={(event) => { setLng(event.target.value)}}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputLocation">Location</label>
                      <input type="text" className="form-control" id="inputLocation" onChange={(event) => { setLocation(event.target.value)}}/>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputType">Date</label>
                        <DatePicker className="form-control" selected={date} onChange={(date) => setDate(date)}/>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputType">Time</label>
                        <DatePicker
                          className="form-control"
                          selected={time}
                          onChange={(date) => setTime(date)}
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
                        <input type="type" className="form-control" id="inputType" onChange={(event) => { setType(event.target.value)}}/>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputTag">Tag</label>
                        <select id="inputTag" className="form-control" onChange={(event) => {setTagSelected(event.target.value)}}>
                          {tag.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputLocation">Description</label>
                      <input type="text" className="form-control" id="inputLocation" onChange={(event) => { setDescription(event.target.value)}}/>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light">Cancel</button>
                <button type="button" className="btn btn-secondary">Clear</button>
                <button type="button" className="btn btn-success" onClick={insertBin}>Save</button>
              </div>
            </div>
          </div>
        </div>
    </div>//container
  )
}
