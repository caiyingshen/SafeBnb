import React, { Component } from 'react';
const evtNames = ['ready', 'click', 'dragend'];
const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

class Map extends Component {
  constructor(props) {
          super(props)

          const {lat, lng} = this.props.initialCenter;
          this.state = {
                  currentLocation: {
                    lat: lat,
                    lng.lng;
                  }
          }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  // loads the current location of the user
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
    }
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      let zoom = 14;
      let lat = 42.3601;
      let longit = 71.0589;
      const center = new maps.LatLng(lat, longit);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })

      this.map = new maps.Map(node, mapConfig);

      evtNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');
      // let centerChangedTimeout;
      // this.map.addListener('dragend', (evt) => {
      //   if (centerChangedTimeout) {
      //     clearTimeout(centerChangedTimeout);
      //     centerChangedTimeout = null;
      //   }
      //   centerChangedTimeout = setTimeout(() => {
      //     this.props.onMove(this.map);
      //   }, 0);
      // })
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng)
        map.panTo(center)
    }
  }

  handleEvent(evtName) {
    let timeout;
    let handlerName = `on${camelize(evtName)}`;
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
    }
  }

  render() {
   return (
        <div ref='map'>
          Loading Map...
        </div>
   )
  }
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool,
  onMove: React.PropTypes.func,
  evtNames.forEach(e => Map.propTypes[camelize(e)] = T.func)
}

Map.defaultProps = {
  onMove: function() {}, // default prop
  zoom: 13,
  // Boston
  initialCenter: {
    lat: 42.3601,
    lng: 71.0589
  },

  centerAroundCurrentLocation = false
}

export default Map;
