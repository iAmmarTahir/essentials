import React, { useState } from 'react';
import {BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom'


import Login from './components/Login'
import SignUp  from './components/SignUp'
import Home from './components/Home';
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import AddItem from './components/AddItem'
import Order from './components/Order';
import OrderRecieved from './components/OrderRecieved';

function App() {

  const [isAuth, setAuth] = useState(false)

  

  return ( 
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/home" component={Home}/>
          <PrivateRoute exact path="/addItem" component={AddItem}/>
          <PrivateRoute  exact path="/order" component={Order}/>
          <PrivateRoute exact path="/orderRecieved" component={OrderRecieved}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
