import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import Map from './Map';
import Loading from './Loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geolocation: props.location.state.isSharingGeolocation,
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
    }

    getRestaurant(lat, lng) {
        // http request to server
        axios.post('http://localhost:8000/getrestaurant', {
            lng: lng,
            lat: lat,
            hasGeolocation: true
        })
        .then((response) => {
            console.log(response);
            this.setState({
                restaurant: {
                    name: response.data.name,
                    address: response.data.location.display_address,
                    phone: response.data.restaurant_phone,
                    rating: response.data.rating,
                    coords: response.data.coordinates,
                    url: response.data.url
                },
            })
        }); 
    }

    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({
            userLocation: `${lat}, ${lng}`,
            center: [lat, lng]
        })
        console.log(`User's geolocation is ${lng}, ${lat}`);
        // call getRestaurant() to make http post request
        this.getRestaurant(lat, lng);
    }

    getUserLocation() {
        // Check if API is available on user's browsers
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }

    defaultLocation() {
        const defaultLng = -122.083855;
        const defaultLat = 37.386051;
        this.setState({
            userLocation: `${defaultLat}, ${defaultLng}`,
            center: [defaultLat, defaultLng]
        })
        console.log(`Default geolocation is ${defaultLng}, ${defaultLat}`);
                // call getRestaurant() to make http post request
        this.getRestaurant(defaultLat, defaultLng);
    }

    componentDidMount() {
        navigator.geolocation && this.state.geolocation ? this.getUserLocation() : this.defaultLocation();
    }

    render() {
        return (
            <div className="Home">
                <Header />
                {/* Show loading component if data is loading */}
                {
                    this.state.center && this.state.userLocation ? <Map
                        isSharingGeolocation={this.state.geolocation}
                        restaurant={this.state.restaurant}
                        userLocation={this.state.userLocation}
                        height={'100vh'}
                        width={'100%'}
                        center={this.state.center}
                        baseLayer={'map'}
                        zoom={14}
                    /> : <Loading />
                }
            </div>
        )
    }
}

export default Home;