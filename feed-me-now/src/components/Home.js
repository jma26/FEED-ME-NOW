import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Map from './Map';
import Loading from './Loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geolocation: props.location.state.isSharingGeolocation,
            center: props.location.state.center,
            userLocation: props.location.state.userLocation,
            hasError: false,
            errorMsg: ''
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
    }

    getRestaurant(lat, lng) {
        // http request to server
        axios.post('/getrestaurant', {
            lng: lng,
            lat: lat,
            hasGeolocation: true
        })
        .then((response) => {
            console.log(response);
            if (response.data.error) {
                console.log('Sorry, no restaurants found');
                this.setState({
                    hasError: true,
                    errorMsg: response.data.error

                })
            } else {
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
            }
        })
        .catch((error) => {
            console.log(error);
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

    reloadNewRestaurant() {
        this.getRestaurant(this.state.center[0], this.state.center[1]);
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
        if (navigator.geolocation && this.state.geolocation) {
            this.getUserLocation();
        } else if (this.state.center && this.state.userLocation) {
            this.reloadNewRestaurant();
        } else {
            this.defaultLocation();
        }
    }

    render() {
        var REDIRECT_COMPONENT, MAP_LOADING_COMPONENT;
        if (this.state.hasError && this.state.errorMsg) {
            REDIRECT_COMPONENT = <Redirect to={{
                pathname: '/error',
                state: {error: this.state.errorMsg}
            }} />
        } else {
            MAP_LOADING_COMPONENT = this.state.center && this.state.userLocation ? <Map
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
        return (
            <div className="Home">
                <Header />
                {REDIRECT_COMPONENT}
                {MAP_LOADING_COMPONENT}
            </div>
        )
    }
}

export default Home;