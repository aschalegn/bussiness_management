import axios from 'axios';
import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/Layouts/AppBar';
import UserProvider from './context/User';
import { baseURL } from './utils';

const sse = new EventSource(`${baseURL}sse/6028e4f2ed8a283230f4bc6c`)
function App() {
  useEffect(() => {
    // sse.onmessage = (msg) => {
    //   console.log(msg);
    // }

    sse.addEventListener("appointmentAdded", (e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <NavBar />
      </UserProvider>
    </div>
  );
}

export default App;
