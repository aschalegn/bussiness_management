import axios from 'axios';
import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/Layouts/AppBar';
import UserProvider from './context/User';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
      </UserProvider>
    </div>
  );
}

export default App;
