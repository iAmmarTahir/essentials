import React, { Component } from 'react'
import { Redirect , Route } from 'react-router-dom'
import {connect } from 'react-redux'
const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
    {...rest}
    render={props => authenticated ? (
        <Component {...props}/>
    ) : (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: props.location}
            }}
        />
    )}
    />
)

const mapStateToProps = (state) => ({
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(PrivateRoute)