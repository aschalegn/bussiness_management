import axios from 'axios';
import React, { Suspense } from 'react';
import './App.css';
import NavBar from './components/Layouts/AppBar';
import UserProvider from './context/User';
import "./i18n";

function App() {
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
