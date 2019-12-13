import React, { Component } from 'react';

import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userAction'

import { CircularProgress } from '@material-ui/core';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loginError: ''
        }
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        
        this.props.loginUser(userData, this.props.history)
            

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loginError: nextProps.ui.errors
        })
    }
    render() {
        const {email, password} = this.state
        const {ui: loading} = this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1 className="title">Login</h1>
                        
                            
                                
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                id="email" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => this.handleEmailChange(e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="password" 
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => this.handlePasswordChange(e)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Log in</button>
                                        
                                    </form>
                                {
                                this.state.loginError && (
                                <h6>{this.state.loginError}</h6>
                                )
                                }
                    
                        {
                            this.state.isLoading && (
                                                <CircularProgress style={{margin: '20px 0'}}/>
                                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
}) 

const mapActionToProps = {
    loginUser
}


export default connect(mapStateToProps, mapActionToProps)(Login);