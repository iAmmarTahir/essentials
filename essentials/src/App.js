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

import AuthRoute from './AuthRoute'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'


import './App.css'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  }
})

function App() {

  const token = localStorage.getItem('token')
  let authenticated = token === null ? false : true 

  return ( 
    <MuiThemeProvider theme={Theme}>
      <Router>
        <div>
          <Navbar authenticated={authenticated}/>
          <div style={{marginTop: '100px', marginLeft: 'auto'}} className="container">
            <Switch>
              <AuthRoute path="/login" component={Login} authenticated={authenticated}/>
              <AuthRoute path="/signup" component={SignUp} authenticated={authenticated}/>
              <PrivateRoute exact path="/addItem" component={AddItem}/>
              <PrivateRoute  exact path="/order" component={Order}/>
              <PrivateRoute exact path="/orderRecieved" component={OrderRecieved}/>
              <PrivateRoute exact path="/home" component={Home}/>
            </Switch>
          </div>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
