import React, { Component } from 'react';

import {
    CircularProgress
} from '@material-ui/core';


import { connect } from 'react-redux'
import {signUpUser} from '../redux/actions/userAction'

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            isLoading: false,
            signUpError: ''
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

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handlePhoneChange(e){
        this.setState({
            phone: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const userData = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            phone: this.state.phone
        }
        this.props.signUpUser(userData, this.props.history)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            signUpError: nextProps.ui.errors
        })
    }

    render() {
        const {name, email, password, phone} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1 className="title">SignUp</h1>
                        
                            
                                
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="name" 
                                                aria-describedby="text" 
                                                placeholder="Enter name"
                                                value={name}
                                                onChange={(e) => this.handleNameChange(e)}
                                            />
                                        </div>
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
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="phone" 
                                                placeholder="Phone"
                                                value={phone}
                                                onChange={(e) => this.handlePhoneChange(e)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Sign Up</button>
                                    </form>
                                {
                                    this.state.signUpError && (
                                    <h6>{this.state.signUpError}</h6>
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
    signUpUser
}

export default connect(mapStateToProps, mapActionToProps)(SignUp);