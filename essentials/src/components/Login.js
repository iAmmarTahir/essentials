import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
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
        console.log(this.state.email + ' ' + this.state.password)
        axios.post('http://localhost:4000/api/user/login', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            localStorage.setItem('token',res.data.token)
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        const {email, password} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label for="email">Email address</label>
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
                                <label for="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => this.handlePasswordChange(e)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;