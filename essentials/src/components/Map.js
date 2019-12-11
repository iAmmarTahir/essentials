import React, { useEffect, useState } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import axios from 'axios'
 
function Map(){
  const [things, setThings] = useState([])
  const [selectedThing, setSelectedThing] = useState(null)
  useEffect(() => {
    axios.get('http://localhost:4000/api/thing/all')
      .then((res) => {
        setThings(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{
        lat: 31.551243595186207,
        lng: 74.3959136225749
      }}>
        {
          things.map((thing) => (
            <Marker key={thing._id} position={{
              lat: thing.location.lat,
              lng: thing.location.lng
            }}
            onClick = {() => {
              setSelectedThing(thing)
            }}
            />
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
              <img style={{height: '100px', width: '120px'}} src={`http://localhost:4000/${selectedThing.image}`}/>
              <h5 style={{textAlign: 'center', fontFamily: 'Roboto'}}>{selectedThing.name}</h5>
            </div>
          </InfoWindow>
        }
      </GoogleMap>
   
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


 
export default MapWrapped;