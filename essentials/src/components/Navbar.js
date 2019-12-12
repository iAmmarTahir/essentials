
import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authenticated : this.props.authenticated,
            logOut: false
        }
    }


    handleLogOut(e) {
        localStorage.removeItem('token')
    }

    render() {
        return (
            <AppBar>
                <ToolBar>
                    <Typography style={{marginRight: '50px'}} variant="h6">ESSENTIALS</Typography>
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">Sign Up</Button> 
                    {
                        this.state.authenticated && (
                            <Button onClick={(e) => this.handleLogOut(e)} color="inherit" >Log Out</Button> 
                        )
                    }               
                </ToolBar>
            </AppBar>
        )
    }
}

export default Navbar;