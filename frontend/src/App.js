import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import './App.css';

import { Button } from 'react-bootstrap';

import Modal from './components/Modal';
import CreateBin from './components/CreateBin';
import UpdateBin from './components/UpdateBin';
import SideBar from './components/SideBar';
import NavbarTop from './components/NavbarTop';

import {
  getBins,
  getCreateBin,
  getUpdatedBin,
  getDeleteBin
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
    console.log(bin);
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

  // Delete Bin from API
  const deleteBin = async id => {
    setLoading(true);
    console.log(id);
    try {
      await getDeleteBin(id)
      .then(res => {
        dispatch({
          type: "SET_BINS",
          data: bins.filter(bin => bin.id !== id)
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Delete Bin from API
  const updateBin = async (id, updateBin) => {
    setLoading(true);
    console.log(id);
    try {
      await getUpdatedBin(id, updateBin)
      .then(res => {
        dispatch({
          type: "SET_BINS",
          data: bins.map(bin =>
            bin.id === id ? Object.assign(bin, updateBin) : bin
          )
        });
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
          setModal={setModal}
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
          bins.filter(bin => (bin.tag === 2 || !null)).map(bin => (
              <Marker key={bin.id} position={[bin.lat, bin.lng]} 
                eventHandlers={{
                  click: (e) => {
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
            <CreateBin createBin={createBin} setActiveModal={setActiveModal} />
          )}
          { activeModal.type === "UPDATE_BIN" && (
            <UpdateBin criteria={criteria} updateBin={updateBin} deleteBin={deleteBin} setActiveModal={setActiveModal} />
          )}
        </Modal>
      )}

      <Button className="button-insert" variant="primary" onClick={() => {setModal({name: "Rubbish bin location ", type: "ADD_BIN"})}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
      </Button>
    </div>//container
  )
}
