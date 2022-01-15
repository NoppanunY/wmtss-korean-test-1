import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import axios from "axios";
import './App.css';

import { Button } from 'react-bootstrap';

import Modal from './components/Modal';
import CreateBin from './components/CreateBin';
import SideBar from './components/SideBar';
import NavbarTop from './components/NavbarTop';

import {
  getBins,
  getCreateBin
} from './app/api';

export default function App() {
  const dispatch = useDispatch();
  const bins = useSelector(state => state.bins)

  const [loading, setLoading] = useState(false);
  
  const [criteria, setCriteria] = useState({});

  const [activeSidebar, setActiveSidebar] = useState(false);
  const [activeModal, setActiveModal] = useState({ name: "", type: "", active: false });

  // Setting up Modal
  const setModal = modal => {
    setActiveModal({ name: modal.name, type: modal.type, active: true });
  };

  // Create Bin from API
  const createBin = async bin => {
    setLoading(true);
    try {
      await getCreateBin(bin)
      .then(res => {
        dispatch({ type: "ADD_BIN", data: res.data })  
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch Bins from API
  const fetchBins = async () => {
    setLoading(true);
    try {
      await getBins()
      .then((response) => {
        dispatch({type: 'SET_BINS', data: response.data})
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBins();
  }, []);

  return (
    <div className="app">
      <NavbarTop/>

      { activeSidebar && (
        <SideBar 
          criteria={criteria}
          hideSidebar={() => {setActiveSidebar(false)}}
        ></SideBar>
      )}

      <MapContainer center={[13.2848334, 100.9179506]} zoom={14} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {loading ? (
          null
        ) : (
          bins.map(bin => (
              <Marker key={bin.id} position={[bin.lat, bin.lng]} 
                eventHandlers={{
                  click: (e) => {
                    // console.log('marker clicked', bin)
                    setCriteria({
                      "id": bin.id
                    });
                    setActiveSidebar(true);
                  },
                }}
              ></Marker>
            )
          )
        )}
      </MapContainer>

      {activeModal.active && (
        <Modal activeModal={activeModal} closeModal={() => {setActiveModal(false)}}>
          { activeModal.type === "ADD_BIN" && (
            <CreateBin createBin={createBin} setActiveModal={setActiveModal}/>
          )}
        </Modal>
      )}

      <Button className="button-insert" variant="primary" onClick={() => {setModal({name: "Add bin", type: "ADD_BIN"})}}>Add Bin</Button>
    </div>//container
  )
}
