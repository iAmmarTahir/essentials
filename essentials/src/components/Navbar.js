
import React, { Component, Fragment } from 'react';
import {Redirect, Link} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

import {logOutUser }from '../redux/actions/userAction'

import {connect } from 'react-redux'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authenticated: false
        }
    }

    componentDidMount() {
        this.setState({
            authenticated: this.props.user.authenticated
        })
    }
    handleLogOut(e) {
        console.log('clicked')
        this.props.logOutUser()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            authenticated: nextProps.user.authenticated
        })
    }

    render() {
        return (
            <AppBar>
                <ToolBar>
                    <Typography style={{marginRight: '50px'}} variant="h6">ESSENTIALS</Typography>
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                    {
                        this.state.authenticated ? (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/addItem">Add Item</Button>
                                <Button color="inherit" component={Link} to="/orderDetails">Orders</Button>
                                <Button color="inherit" onClick={(e) => this.handleLogOut(e)}>Log Out</Button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Sign Up</Button> 
                            </Fragment>
                        )
                    }            
                </ToolBar>
            </AppBar>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionToProps = {
    logOutUser
}

export default connect(mapStateToProps, mapActionToProps)(Navbar);