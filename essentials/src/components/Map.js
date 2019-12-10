import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 31.55164124447547,
      lng: 74.3978261947632
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '89vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys = {
              {
                  key: 'AIzaSyA9dUnJgH_qUwXZo7QXDRt--yHRF9SFoPY'
              }
          }
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;