
import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/HomePage/home';
import  SignIn  from './components/Login/index';
import  SignUp  from './components/Register/index';
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/Home' component={Home}/>
          <Route exact path='/' component={SignIn}/>
          <Route exact path='/signUp' component={SignUp}/>
        </Switch>
      </Router>
      {/* <Home/>
      <SignIn />
      <SignUp /> */}
    </div>
  );
}

export default App;
