import React, { useEffect, useState } from 'react';
import MapWrapped from './Map';
import {config} from '../API'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Home(props) {
    return (
        <div style={{ width: "100vw", height: "90vh" }}>
            <Link to="/addItem"><button className="btn btn-primary">Add Item</button></Link>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                config.API_KEY
                }`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default Home;

