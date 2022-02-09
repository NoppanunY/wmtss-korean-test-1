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
  getDeleteBin,
  getCreateImage
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
  const createBin = async (bin, image) => {
    setLoading(true);
    console.log(bin);
    console.log(image);
    try {
      await getCreateBin(bin)
      .then(res => {
        dispatch({ type: "ADD_BIN", data: res.data });
        if(image.length > 0){
          image.forEach((element, index)  => {
            image[index]["bin"] = res.data.id;
          });
          createImage(image);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Create Images from API
  const createImage = async (image) => {
    setLoading(true);
    console.log(image);
    try {
      await  getCreateImage(image)
      .then(res => {
        console.log("Success");
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
  const updateBin = async (id, updateBi) => {
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

      {/* <Button type="button" id="btnAdd" onClick={() => {setModal({name: "Rubbish bin location ", type: "ADD_BIN"})}}>
        
      </Button> */}

      <Button type="button" id="btnAdd" onClick={() => {setModal({name: "Rubbish bin location ", type: "ADD_BIN"})}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
        </svg>
      </Button>

      <Button type="button" id="btnBin1">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>

      <Button type="button" id="btnBin2">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="yellow" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>
      
      <Button type="button" id="btnBin3">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>

      <Button type="button" id="btnBin4">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>
      
    </div>//container
  )
}
