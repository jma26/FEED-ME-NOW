import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import Map from './Map';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geolocation: props.location.state.isSharingGeolocation
        }
    }

    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(`User's geolocation is ${lng}, ${lat}`);
        // http request to server
        axios.post('http://localhost:8000/getrestaurant', {
            lng: lng,
            lat: lat,
            hasGeolocation: true
        });
    }

    getUserLocation() {
        // Check if API is available on user's browsers
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        }
    }

    defaultLocation() {
        const defaultLng = -122.083855;
        const defaultLat = 37.386051;
        console.log(`Default geolocation is ${defaultLng}, ${defaultLat}`);
    }

    render() {
        navigator.geolocation && this.state.geolocation ? this.getUserLocation() : this.defaultLocation();
        return (
            <div className="Home">
                <Header />
                <Map
                    height={'100vh'}
                    width={'100%'}
                    center={[37.7749, -122.4194]}
                    baseLayer={'light'}
                    zoom={14}
                    apiKey={process.env.REACT_APP_MAPQUEST_API_KEY}
                />
            </div>
        )
    }
}

export default Home;