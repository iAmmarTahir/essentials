import React from 'react';
import {BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom'


import Login from './components/Login'
import SignUp  from './components/SignUp'
import Home from './components/Home';
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return ( 
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/home" component={Home}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
