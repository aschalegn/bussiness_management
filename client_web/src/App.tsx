import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppBar from './components/Layouts/AppBar/AppBar';
import Home from './components/Client/HomePage/home';
import SignIn from './components/Client/Login';
import SignUp from './components/Client/Register';
import Register from './components/Admin/Register';
import LogIn from './components/Admin/Login';
import MakeAppointment from './components/Client/AfterLogin/MakeAppointment';
import UserProvider from './context/User';
function App() {

  return (
    <div className="App">
      <AppBar/>
 
    </div>
  );
}

export default App;
