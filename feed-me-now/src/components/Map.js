import React, { Component } from 'react';

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
            }, this.loadDirections)
        } 
    }

    loadDirections() {
        console.log(this.state.userLocation);
        window.L.mapquest.directions().route({
            start: `${this.state.userLocation}`,
            end: '38.447536, -122.701134'
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
        window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_API_KEY;
        var map = window.L.mapquest.map('map', {
            center: this.props.center,
            layers: window.L.mapquest.tileLayer(this.props.baseLayer),
            zoom: this.props.zoom,
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
            <div className="Map__destination">
                <a href={this.props.restaurant.url} target="_blank"><p>{this.props.restaurant.name}</p></a>
                <p>{this.iterateRestaurantAddress(this.props.restaurant.address)}</p>
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
            </div>
        )
    }
}

export default Map;