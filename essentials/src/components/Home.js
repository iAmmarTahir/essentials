import React, { useEffect, useState } from 'react';
import MapWrapped from './Map';
import {config} from '../API'
import {Link} from 'react-router-dom'
import { Button, Typography } from '@material-ui/core';
import Axios from 'axios';


function Home(props) {

    const [user, setUser ] = useState('')

    useEffect(
        () => {
            Axios.post('http://localhost:4000/api/user/getTokenData', {
                    token: 'Bearer '.concat(localStorage.getItem('token'))
                })
                .then((res) => {
                    setUser(res.data.result.name)
                })
                .catch((err) => {
                    console.log(err)
                })
        },[]
    )

    return (
        <div style={{ width: "80vw", height: "70vh" }}>
            {
                user && (
                <Typography variant="h5" color="primary">Hi, {user}</Typography>
                )
            }
            <Button color="primary" component={Link} to="/addItem">Add Item</Button>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                config.API_KEY
                }`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        </div>
    );
}

export default Home;

