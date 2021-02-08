import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminHome from './components/Layouts/Admin/Home';
import Setting from './components/Layouts/Admin/Setting/Setting';


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
            <Route exact path='/user/appointment' component={MakeAppointment} /
            >
            <Route exact path='/admin/signUp' component={Register} />
            <Route exact path='/admin/login' component={LogIn} />
            
             <Route path='/Setting' component={Setting}/> 
               <Route path='/AdminHome' component={AdminHome}/>
          </UserProvider>
        </Switch>
      </Router>
 
    </div>
  );
}

export default App;
