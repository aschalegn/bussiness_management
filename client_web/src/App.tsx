import React, { Suspense, useEffect } from 'react';
import './App.css';
import NavBar from './components/Layouts/AppBar';
import UserProvider from './context/User';
import "./i18n";
import { io } from "socket.io-client";
function App() {
  const socket = io("http://localhost:1000");
  useEffect(() => {
    socket.on("start", (data: any) => {
      console.log(data);
      
    });
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
        <UserProvider>
          <NavBar />
        </UserProvider>
      </Suspense>
    </div>
  );
}

export default App;
