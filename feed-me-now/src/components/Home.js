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
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
    }

    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({
            userLocation: `${lat}, ${lng}`
        })
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
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }

    defaultLocation() {
        const defaultLng = -122.083855;
        const defaultLat = 37.386051;
        this.setState({
            userLocation: `${defaultLat}, ${defaultLng}`
        })
        console.log(`Default geolocation is ${defaultLng}, ${defaultLat}`);
    }

    componentDidMount() {
        navigator.geolocation && this.state.geolocation ? this.getUserLocation() : this.defaultLocation();
    }

    render() {
        return (
            <div className="Home">
                <Header />
                <Map
                    userLocation={this.state.userLocation}
                    height={'100vh'}
                    width={'100%'}
                    center={[37.7749, -122.4194]}
                    baseLayer={'light'}
                    zoom={14}
                />
            </div>
        )
    }
}

export default Home;