import React, { Component } from 'react';

import Header from './Header';

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
            </div>
        )
    }
}

export default Home;