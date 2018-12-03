import React, { Component } from 'react';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import { camelize } from '../helpers';

const evtNames = ['click', 'mouseover'];

export class Marker extends Component {
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        if (this.marker) {
          this.marker.setMap(null);
        }

        this.renderMarker();
    }
  }

  // removes markers
  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  renderMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    if (!(pos instanceof google.maps.LatLng)) {
      pos = new google.maps.LatLng(pos.lat, pos.lng);
    }

    const pref = {
      map: map,
      position: pos
    };
    this.marker = new google.maps.Marker(pref);

    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    });
  }

  handleEvent(evtName) {
    return (e) => {
      const handlerName = `on${camelize(evtName)}`;
      if (this.props[handlerName]) {
        this.props[handlerName](this.props, this.marker, e);
      }
    };
  }

  render() {
    return null;
  }
}

Marker.PropTypes = {
  position: PropTypes.object,
  map: PropTypes.object
};

evtNames.forEach(e => (Marker.PropTypes[camelize(e)] = PropTypes.func));

Marker.defaultProps = {
  name: 'Marker'
};

export default Marker;
