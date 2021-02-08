import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
      <Router>
        <Switch>
          <UserProvider>
            <Route exact path='/Home' component={Home} />
            <Route exact path='/' component={SignIn} />
            <Route exact path='/signUp' component={SignUp} />
            <Route exact path='/admin/signUp' component={Register} />
            <Route exact path='/admin/login' component={LogIn} />
            <Route exact path='/user/appointment' component={MakeAppointment} />
          </UserProvider>
        </Switch>
      </Router>
      {/* <Home/>
      <SignIn />
      <SignUp /> */}
    </div>
  );
}

export default App;
