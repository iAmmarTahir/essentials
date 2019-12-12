import React, { Component } from 'react';
import axios from 'axios'
import './styles/login.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            isLoading: false,
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
        this.setState({
            isLoading: true
        })
        
        setTimeout(() => {
            axios.post('http://localhost:4000/api/user/login', {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/home')
                
            }).catch((err) => {
                this.setState({
                    isLoading: false,
                    loginError: 'Login failed due to incorrect credentials...'
                })
                setTimeout(() => {
                    this.setState({
                        loginError: '',
                        email: '',
                        password: ''
                    })
                    this.props.history.push('/login')
                }, 2000)
            })
            
        },2000)
    }
    render() {
        const {email, password} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1 className="title">Login</h1>
                        {
                            this.state.isLoading ? (
                                <h1>Loading...</h1>
                            ) : (
                                this.state.loginError ? (
                                <h1>{this.state.loginError}</h1>
                                ) : (
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
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;