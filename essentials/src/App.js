import React from 'react';
import {BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom'


import Login from './components/Login'
import SignUp  from './components/SignUp'

function App() {
  return ( 
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
      </div>
  );
}

export default App;
