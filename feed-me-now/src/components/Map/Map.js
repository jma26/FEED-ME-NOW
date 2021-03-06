import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Map.css';

import Footer from '../Common/Footer/Footer';

class Map extends Component {
  constructor(props) {
    super(props);
    this.loadDirections = this.loadDirections.bind(this);
    this.iterateRestaurantAddress = this.iterateRestaurantAddress.bind(this);
  }

  loadDirections(coords) {
    console.log('Loading directions');
    let restaurantCoords = `${coords.latitude}, ${coords.longitude}`;
    window.L.mapquest.directions().route({
      start: this.props.user.coordinates,
      end: restaurantCoords,
    });
  }

  iterateRestaurantAddress(address) {
    var restaurant_address = '';
    for (let i = 0; i < address.length; i++) {
      restaurant_address += `${address[i]} `;
    }
    console.log(restaurant_address);
    return restaurant_address;
  }

  componentDidMount() {
    window.L.mapquest.key = `${process.env.REACT_APP_MAPQUEST_API_KEY}`;
    var map = window.L.mapquest.map('map', {
      center: this.props.center,
      zoom: this.props.zoom,
      layers: window.L.mapquest.tileLayer(this.props.baseLayer),
    });
    // Position zoom control
    map.zoomControl.setPosition('topright');
    let directions = window.L.mapquest.directions();
    directions.setLayerOptions({
      startMarker: {
        draggable: false,
      },
      endMarker: {
        draggable: false,
      },
      routeRibbon: {
        draggable: false,
      },
    });
    this.loadDirections(this.props.restaurant.coordinates);
  }

  render() {
    var destination;
    if (this.props.restaurant) {
      destination = (
        <div className="destination">
          <p className="destination__name white-bg">
            Go eat at
            <a
              href={this.props.restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="destination__link"
            >
              {this.props.restaurant.name}
            </a>
          </p>
          <p className="destination-box__address white-bg">
            {this.iterateRestaurantAddress(this.props.restaurant.address)}
          </p>
        </div>
      );
    }
    const mapStyle = {
      height: this.props.height,
      width: this.props.width,
    };
    return (
      <div className="Map">
        <div id="map" style={mapStyle}></div>
        {destination}
        <Footer
          center={this.props.user.center}
          isSharingGeolocation={this.props.user.hasGeolocation}
          userLocation={this.props.user.coordinates}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.handleActionsReducer.user,
});

export default connect(mapStateToProps, null)(Map);
