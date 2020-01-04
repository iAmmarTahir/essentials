import React, { useState } from 'react';
import {BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store'

import Login from './components/Login'
import SignUp  from './components/SignUp'
import Home from './components/Home';
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import AddItem from './components/AddItem'
import Order from './components/Order';
import OrderRecieved from './components/OrderRecieved';
import OrderDetails from './components/OrderDetails'
import AddReview from './components/AddReview'

import AuthRoute from './AuthRoute'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'


import './App.css'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ProductReview from './components/ProductReview';

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

  return ( 
    <MuiThemeProvider theme={Theme}>
      <Provider store={store}>
        <Router>
            <Navbar/>
            <div style={{marginTop: '100px', marginLeft: 'auto'}} className="container">
              <Switch>
                <AuthRoute path="/login" component={Login} />
                <AuthRoute path="/signup" component={SignUp} />
                <PrivateRoute exact path="/addItem" component={AddItem}/>
                <PrivateRoute  exact path="/order" component={Order}/>
                <PrivateRoute exact path="/orderRecieved" component={OrderRecieved}/>
                <PrivateRoute exact path="/orderDetails" component={OrderDetails}/>
                <PrivateRoute path="/addReview" component={AddReview}/>
                <PrivateRoute path="/productReviews" component={ProductReview}/>
                <PrivateRoute exact path="/home" component={Home}/>
                <PrivateRoute exact path="/" component={Home}/>
              </Switch>
            </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
