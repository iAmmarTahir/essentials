import React, { useEffect, useState, Fragment } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {URL} from '../webConfig'
import { Button } from '@material-ui/core';
 
function Map(){
  const [things, setThings] = useState([])
  const [selectedThing, setSelectedThing] = useState(null)
  
  useEffect(() => {
    const token = 'Bearer '.concat(localStorage.getItem('token'))
    axios.get(URL + 'api/thing/all', {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setThings(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
      <Fragment>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{
            lat: 31.551243595186207,
            lng: 74.3959136225749
          }}>
            {
              things.map((thing) => (
                (
                  <Marker key={thing._id} position={{
                    lat: thing.location.lat,
                    lng: thing.location.lng
                  }}
                  onClick = {() => {
                    setSelectedThing(thing)
                  }}
                  />
                )
              ))
            }
            {
              selectedThing &&
              <InfoWindow
                position={{
                  lat: selectedThing.location.lat,
                  lng: selectedThing.location.lng
                }}
                onCloseClick={() => {
                  setSelectedThing(null)
                }}
              >
                <div>
                  < img style = {
                    {
                      height: '100px',
                      width: '150px'
                    }
                  }
                  src = {
                    `${URL + selectedThing.image}`
                  }
                  />
                  <h5 style={{textAlign: 'center', fontFamily: 'Roboto'}}>{selectedThing.name}</h5>
                  <p>Price: Rs. {selectedThing.price}</p>
                  <p>Quantity: {selectedThing.quantity}</p>
                  {
                    !selectedThing.isSold && (
                      <Link className="btn btn-primary" to={{
                        pathname: '/order',
                        state: selectedThing
                      }}>Order</Link>
                    )
                    
                  }
                  {
                    selectedThing.isSold && (
                      <p>Status: <span style={{fontWeight: 'bold'}}>Sold</span></p>
                    )
                  }
                  <Link className="btn btn-primary" style={{marginLeft: '5px'}} to= {{
                    pathname: '/productReviews',
                    state: selectedThing
                  }}>
                    Reviews
                  </Link>
                </div>
              </InfoWindow>
            }
          </GoogleMap>
      </Fragment>
      
    
   
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


 
export default MapWrapped;