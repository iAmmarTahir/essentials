import React, { useEffect, useState } from 'react';
import MapWrapped from './Map';
import {config} from '../API'
import {Link} from 'react-router-dom'
import { Button, Typography } from '@material-ui/core';
import Axios from 'axios';
import {connect} from 'react-redux'


function Home(props) {

    const [user, setUser ] = useState('')

    useEffect(
        () => {
            setUser(props.username.result.name)
        },[]
    )

    return (
        <div style={{ width: "80vw", height: "70vh" }}>
            {
                user && (
                    <Typography variant="h5" color="primary">Hi, {user}</Typography>
                )
            }
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

const mapStateToProps = (state) => ({
    username: state.user.credentials
})

export default connect(mapStateToProps)(Home);

