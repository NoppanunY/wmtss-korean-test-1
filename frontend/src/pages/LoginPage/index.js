import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';

import { loginUser } from "../../services/actions/authAction";

import Modal from '../../components/Modal';

const LoginPage = () => {
  const session = useSelector(state => state.sessions);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [activeModal, setActiveModal] = useState({ name: "", type: "", active: false });

  const submitForm = e => {
    console.log("Submited");
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  }

  return (
    <>
      { (session.isAuthenticated && !session.isLoading) ? (
        <Redirect to="/"/>
      ) : (
        <>
          <Modal activeModal={activeModal} closeModal={() => {setActiveModal(false)}}>
            <form onSubmit={submitForm}>
                <input type="test" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit"/>
            </form>
          </Modal>
          <MapContainer center={[13.2848334, 100.9179506]} zoom={14} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </>
      )}
    </>
  )
}

export default LoginPage;