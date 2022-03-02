import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css';

import PrivateRoute from './services/utils/PrivateRoute';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import {
  loadUser,
} from './services/actions/authAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Router>
        <Header/>
        <PrivateRoute component={HomePage} path="/" exact/>
        <Route component={LoginPage} path="/login"/>
      </Router>
    </div>
  )
}

export default App;