import React, { Component } from 'react';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { camelize } from '../helpers';

const evtNames = ['ready', 'click', 'dragend', 'recenter', 'resize'];
const mapStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
};

export { Marker } from './Marker';
export { InfoWindow } from './InfoWindow';

export class Map extends Component {
  constructor(props) {
    super(props);

    // const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: this.props.initialCenter.lat,
        lng: this.props.initialCenter.lng
      }
    };

    // console.log("hello there");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }

    if (this.props.zoom !== prevProps.zoom) {
      this.map.setZoom(this.props.zoom);
    }
  }

  // loads the current location of the user
  componentDidMount() {
    // console.log("WIEJWORFHBDJDIJOFWEHGRFDB");
    if (this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });
            });
        }
    }
    this.loadMap();
  }

  loadMap() {
    // console.log("I'm in loadmap");
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      // let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      // let zoom = 14;
      // let lat = 42.3601;
      // let lng = 71.0589;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: this.props.zoom
      });

      this.map = new maps.Map(node, mapConfig);

      evtNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');
      // this.forceUpdate();
    }
  }

  recenterMap() {
    const map = this.map;
    const {google} = this.props;
    if (!google) return;
    const maps = google.maps;

    if (map) {
        let center = this.state.currentLocation;
        if (!(center instanceof google.maps.LatLng)) {
          center = new google.maps.LatLng(center.lat, center.lng);
        }

        // map.panTo(center)
        map.setCenter(center);
        maps.event.trigger(map, 'recenter');
    }
  }

  restyleMap() {
    if (this.map) {
      const {google} = this.props;
      google.maps.event.trigger(this.map, 'resize');
    }
  }

  handleEvent(evtName) {
    // console.log("is handleevent working?");
    let timeout;
    const handlerName = `on${camelize(evtName)}`;
    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    };
  }

  renderChildren() {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;

      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    // console.log("HELLO THERE HI HOW ARE YA");
    const style = Object.assign({}, mapStyles.map, this.props.style, {
      display: this.props.visible ? 'inherit' : 'none'
    });

    const containerStyles = Object.assign(
      {},
      mapStyles.container,
      this.props.containerStyle
    );

    return (
      <div style={containerStyles} className={this.props.className}>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  className: PropTypes.string,
  centerAroundCurrentLocation: PropTypes.bool,
  center: PropTypes.object,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  visible: PropTypes.bool
};

evtNames.forEach(e => (Map.propTypes[camelize(e)] = PropTypes.func));

Map.defaultProps = {
  zoom: 14,
  // Boston
  initialCenter: {
    lat: 42.3601,
    lng: 71.0589
  },

  center: {},
  centerAroundCurrentLocation: false,
  style: {},
  containerStyle: {},
  visible: true
};

export default Map;
