import React, { Component } from 'react';
import { Link, Router, Route } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import GoogleApiWrapper from './MapContainer'

class MapPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markers: [{ name: 'test1', lat: 42.3601, lng: -71.0589 },
        { name: 'test2', lat: 41.35, lng: -70.0589 },
        { name: 'test3', lat: 42.3601, lng: -70.0589 },
        { name: 'test3', lat: 41.3601, lng: -72.0589 },
        { name: 'test3', lat: 41.3601, lng: -71.0789 }]
    }
  }

  onMarkerClick = (props, marker) =>
  this.setState({
    activeMarker: marker,
    selectedPlace: props,
    showingInfoWindow: true
  });

  onInfoWindowClose = () =>
  this.setState({
    activeMarker: null,
    showingInfoWindow: false
  });

onMapClicked = () => {
  if (this.state.showingInfoWindow)
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
};

createMarkers = markers =>
  markers.map(m => (
          <Marker
           name={m.name}
           position={{ lat: m.lat, lng: m.lng}}
           onClick={this.onMarkerClick}>
           </Marker>
  ))


  render() {
    return (
            <Map
              className="map"
              google={this.props.google}
              style={{ height: '100%', position: 'relative', width: '100%' }}
              zoom={14}
              initialCenter={{ lat: 42.3601, lng: -71.0589 }}>

              {this.createMarkers(this.state.markers)}

              <Marker
                name="SOMA"
                position={{ lat: 42.365, lng: -71.0590 }}
                title="The marker`s title will appear as a tooltip."
                onClick={this.onMarkerClick}
              />

              <InfoWindow
                  marker={this.state.activeMarker}
                  onClose={this.onInfoWindowClose}
                  visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                  </div>
                </InfoWindow>
            </Map>

    )
}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAQDXd9PaHTytT46Gxa1rdyGN_g4pQW8bA'
})(MapPage);
