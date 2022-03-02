import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { divIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';

import '../../App.css';


import { Button } from 'react-bootstrap';

import Modal from '../../components/Modal';
import CreateBin from '../../components/CreateBin';
import UpdateBin from '../../components/UpdateBin';
import SideBar from '../../components/SideBar';
import SideBarMenu from '../../components/SideBarMenu';
import NavbarTop from '../../components/NavbarTop';

import {
  fetchBins,
} from '../../services/actions/binAction';

const tagColor = {
  "1": "green",
  "2": "yellow",
  "3": "blue",
  "4": "red",
}

const HomePage = () => {  
  const dispatch = useDispatch();
  const bins = useSelector(state => state.bins)
  const sessions = useSelector(state => state.sessions)
  
  const [criteria, setCriteria] = useState({});

  const [activeSidebar, setActiveSidebar] = useState({name: "", type: "", active: false});
  const [activeModal, setActiveModal] = useState({ name: "", type: "", active: false });

  const [filters, setFilters] = useState([]);

  // Setting up Modal
  const setModal = modal => {
    setActiveModal({ name: modal.name, type: modal.type, active: true });
  };

  const filterBin = (type) => {
    if(filters.indexOf(type) !== -1){
      setFilters(filters.filter((item, i) => item !== type));
    }else{
      var joined = filters.concat(type);
      setFilters(joined)
    }
  }

  useEffect(() =>{
    dispatch(fetchBins());
  }, []);


  return (
    <div className="app">
      <NavbarTop
        showSidebar={setActiveSidebar}>
      </NavbarTop>

        { activeSidebar.active && (
          <>
            { activeSidebar.type === "DETAIL_BIN" && (
              <SideBar 
                criteria={criteria}
                hideSidebar={() => {setActiveSidebar(false)}}
                setModal={setModal}>
              </SideBar>
            )}
            { activeSidebar.type === "MENU" && (
              <SideBarMenu 
                criteria={criteria}
                hideSidebar={() => {setActiveSidebar(false)}}
                setModal={setModal}>
              </SideBarMenu>
            )}
          </>
        )}

      <MapContainer center={[13.2848334, 100.9179506]} zoom={14} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { bins.isLoading ? (
          null
        ) : (
          bins.bin.filter(bin => (filters.indexOf(bin.tag) !== -1 || filters.length === 0)).map(bin => (
              <Marker 
                key={bin.id} position={[bin.lat, bin.lng]}
                icon={divIcon({
                  html: `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-trash3-fill" fill="${tagColor[bin.tag]}" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>`,
                  className: ""
                })}
                eventHandlers={{
                  click: (e) => {
                    setCriteria({
                      "id": bin.id
                    });
                    setActiveSidebar({type: "DETAIL_BIN", active: true});
                  },
                }}
              ></Marker>
            )
          )
        )}
      </MapContainer>

      { activeModal.active && (
        <Modal activeModal={activeModal} closeModal={() => {setActiveModal(false)}}>
          { activeModal.type === "ADD_BIN" && (
            <CreateBin setActiveModal={setActiveModal} />
          )}
          { activeModal.type === "UPDATE_BIN" && (
            <UpdateBin criteria={criteria} setActiveModal={setActiveModal} />
          )}
        </Modal>
      )}

      {/* <Button type="button" id="btnAdd" onClick={() => {setModal({name: "Rubbish bin location ", type: "ADD_BIN"})}}>
        
      </Button> */}

      <Button type="button" id="btnAdd" onClick={() => {setModal({name: "Rubbish bin location ", type: "ADD_BIN"})}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" className="bi bi-plus-circle-fill" viewBox="0 0 16 16" id="iconMenuBin2">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
        </svg>
      </Button>

      <Button type="button" id="btnBin1" className={(filters.indexOf(1) !== -1 ? "filter-active" : "")} onClick={() => {filterBin(1)}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>

      <Button type="button" id="btnBin2" className={(filters.indexOf(2) !== -1  ? "filter-active" : "")} onClick={() => {filterBin(2)}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="yellow" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>
      
      <Button type="button" id="btnBin3" className={(filters.indexOf(3) !== -1  ? "filter-active" : "")} onClick={() => {filterBin(3)}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>

      <Button type="button" id="btnBin4" className={(filters.indexOf(4) !== -1  ? "filter-active" : "")} onClick={() => {filterBin(4)}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </Button>
      
    </div>//container
  )
}

export default HomePage;