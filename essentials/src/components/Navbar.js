import React from 'react';
import {Link} from 'react-router-dom'
import './styles/navbar.css'
function Navbar() {
    return (
        <div className="nav-bar">
            <h1 className="logo">Essentials</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;