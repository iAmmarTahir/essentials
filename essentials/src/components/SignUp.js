import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: ''
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
        axios.post('http://localhost:4000/api/user/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        }).then((res) => {
            localStorage.setItem('token', res.data.token)
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {name, email, password, phone} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label for="name">Name</label>
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
                            <div className="form-group">
                                <label for="phone">Phone</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="phone" 
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => this.handlePhoneChange(e)}
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

export default SignUp;