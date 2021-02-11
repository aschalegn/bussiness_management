import axios from 'axios';
import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/Layouts/AppBar';
import UserProvider from './context/User';
import { baseURL } from './utils';

const sse = new EventSource(`${baseURL}sse/60213e701f365014cc0f8fb4`)
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
