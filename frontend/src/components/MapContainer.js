import React, { Component } from 'react';
import { Map, InfoWindow, Marker } from './';
import { google, GoogleApiWrapper } from 'google-maps-react'

class MapContainer extends Component {
  getInitialState = () => {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
};

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
};

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
};

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    // boston coordinates
    // const {google} = this.props;
    // const maps = google.maps;
    // let lati = 42.3601;
    // let long = 71.0589;
    // const mapCenter = new maps.LatLng(lati, long);
    return (
      <div style={style}>
      <Map google={this.props.google}>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQDXd9PaHTytT46Gxa1rdyGN_g4pQW8bA"
})(MapContainer);
