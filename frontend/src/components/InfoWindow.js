import React, { Component } from 'react';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

export class InfoWindow extends Component {
  componentDidUpdate(prevProps) {
    let {map, google} = this.props;
    if (!map || !google) {
      return;
    }

    if (this.props.map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if ((this.props.visible !== prevProps.visible) ||
        (this.props.marker !== prevProps.marker)) {
      this.props.visible ?
        this.openWindow() :
        this.closeWindow();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }
  }

  openWindow() {
    this.infowindow
      .open(this.props.map, this.props.marker);
  }

  closeWindow() {
    this.infowindow.close();
  }

  renderInfoWindow() {
    let {map, google, mapCenter} = this.props;
    if (!google || !google.maps) {
      return;
    }

    const iw = this.infowindow = new google.maps.InfoWindow({
      content: ''
    });
  }

  updateContent() {
    const content = this.renderChildren();
    this.infowindow.setContent(content);
  }

  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
  }

  render() {
    return null;
  }
}

InfoWindow.PropTypes = {
  children: PropTypes.element.isRequired,
  map: PropTypes.object,
  marker: PropTypes.object,
  visible: PropTypes.bool
}

InfoWindow.defaultProps = {
  visible: false
}

export default InfoWindow;
