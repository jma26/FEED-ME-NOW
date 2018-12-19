import React, { Component } from 'react';
import './Map.css';

import Footer from './Footer';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null
         };
         this.loadDirections=this.loadDirections.bind(this);
         this.iterateRestaurantAddress=this.iterateRestaurantAddress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.userLocation !== nextProps.userLocation) {
            this.setState({
                userLocation: nextProps.userLocation
            })
        }
        if (nextProps.restaurant) {
            this.loadDirections(nextProps.restaurant.coords);
        }
    }

    loadDirections(coords) {
        let restaurantCoords = `${coords.latitude}, ${coords.longitude}`;
        window.L.mapquest.directions().route({
            start: this.props.userLocation,
            end: restaurantCoords
        })
    }

    iterateRestaurantAddress(address) {
        var restaurant_address = '';
        for (let i = 0; i < address.length; i++) {
            restaurant_address += ` ${address[i]}`;
        }
        console.log(restaurant_address);
        return restaurant_address;
    }

    componentDidMount() {
        window.L.mapquest.key = `${process.env.REACT_APP_MAPQUEST_API_KEY}`;
        var map = window.L.mapquest.map('map', {
            center: this.props.center,
            zoom: this.props.zoom,
            layers: window.L.mapquest.tileLayer(this.props.baseLayer)
        });
        // Position zoom control
        map.zoomControl.setPosition('topright');
        let directions = window.L.mapquest.directions();
        directions.setLayerOptions({
            startMarker: {
                draggable: false
            },
            endMarker: {
                draggable: false
            },
            routeRibbon: {
                draggable: false
            }
        })
    }

    render() {
        var destination;
        if (this.props.restaurant) {
            destination = 
            <div className="destination animated slideInLeft">
                <p className="destination__name white-bg">Go eat at <a href={this.props.restaurant.url} target="_blank" rel="noopener noreferrer" className="destination__link">{this.props.restaurant.name}</a></p>
                <p className="destination-box__address white-bg">{this.iterateRestaurantAddress(this.props.restaurant.address)}</p>
            </div>
        }
        const mapStyle = {
            height: this.props.height,
            width: this.props.width
        }
        return (
            <div className="Map">
                <div id="map" style={mapStyle}></div>
                {destination}
                <Footer
                    center={this.props.center}
                    isSharingGeolocation={this.props.isSharingGeolocation}
                    userLocation={this.props.userLocation}
                />
            </div>
        )
    }
}

export default Map;