
import {Link} from 'react-router-dom'
import './styles/navbar.css'

import React, { Component } from 'react';

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false
        }
    }

    render() {
        const { isAuthenticated } = this.state
        return (
            <div className="nav-bar">
                <h1 className="logo">Essentials</h1>
                <nav>
                    {
                        isAuthenticated ? (
                            <button>Log Out</button>
                        ) : (
                            <ul>
                                <li>
                                    <Link to={{ 
                                        pathname:"/login",
                                        state: isAuthenticated
                                    }}>Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Sign Up</Link>
                                </li>
                            </ul>
                        )
                    }
                </nav>
            </div>
        );
    }
}

export default Navbar;