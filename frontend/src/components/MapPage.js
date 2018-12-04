import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Button } from 'reactstrap';
//import GoogleApiWrapper from './MapContainer'

class MapPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        display: false
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
           name={"#" + m.rank + ": " + m.summary}
           position={{ lat: m.latitude, lng: m.longitude}}
           onClick={this.onMarkerClick}>
           </Marker>
  ))

  onInfoWindowOpen(props, e) {
    const button = (
      <Button
        onClick={e => {
                let airbnbId = this.props.markers.find((value) => {
                        return value.summary === this.state.activeMarker.name.substring(4)}).ID
                window.location.href = "http://airbnb.com/rooms/" + airbnbId

        }}
      >
      Book!
      </Button>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("iwc")
    );
  }


  render() {
    return (
            <Map
              className="map"
              google={this.props.google}
              style={{ height: '100%', position: 'relative', width: '100%' }}
              zoom={12}
              initialCenter={{ lat: 42.3601, lng: -71.0589 }}>

              {this.createMarkers(this.props.markers)}

              <InfoWindow
                  marker={this.state.activeMarker}
                  onClose={this.onInfoWindowClose}
                  visible={this.state.showingInfoWindow}
                  onOpen={e => {
                          this.onInfoWindowOpen(this.props, e);
                  }}>
                  {this.state.selectedPlace.name}
              <div id="iwc" />
                </InfoWindow>
            </Map>

    )
}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAQDXd9PaHTytT46Gxa1rdyGN_g4pQW8bA'
})(MapPage);
