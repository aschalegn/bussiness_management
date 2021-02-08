
import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Client/HomePage/home';
import  SignIn  from './components/Client/Login/index';
import  SignUp  from './components/Client/Register/index';
import AdminHome from './components/Layouts/Admin/Home';
import Setting from './components/Layouts/Admin/Setting/Setting';
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/Home' component={Home}/>
          <Route exact path='/' component={SignIn}/>
          <Route path='/Setting' component={Setting}/>
          <Route exact path='/signUp' component={SignUp}/>
          <Route path='/AdminHome' component={AdminHome}/>
        </Switch>
      </Router>
      {/* <AdminHome/> */}
      {/* <Home/>
      <SignIn />
      <SignUp /> */}
    </div>
  );
}

export default App;
