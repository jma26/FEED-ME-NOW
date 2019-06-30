import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUserLocation, getRestaurantData } from '../../redux/actions';

import Map from '../Map/Map';
import Loading from './Loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMsg: ''
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
    }

    getRestaurant(lat, lng) {
        // http request to server
        axios.post('/restaurants', {
            lng: lng,
            lat: lat,
            hasGeolocation: true
        })
        .then((response) => {
            if (response.data.error) {
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
            if (error) {
                this.setState({
                    hasError: true,
                    errorMsg: 'Error posting to /restaurants'
                })
            }
        }); 
    }

    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        this.props.updateUserLocation({
          coordinates: `${lat}, ${lng}`,
          center: [lat, lng]
        })

        console.log(`User's geolocation is ${lng}, ${lat}`);
        // call getRestaurant() to make http post request
        this.props.getRestaurantData({
          lat, 
          lng
        });
    }

    getUserLocation() {
        // Check if API is available on user's browsers
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }

    reloadNewRestaurant() {
        this.props.getRestaurantData(this.state.center[0], this.state.center[1]);
    }

    defaultLocation() {
        const defaultLng = -122.083855;
        const defaultLat = 37.386051;

        this.props.updateUserLocation({
          coordinates: `${defaultLat}, ${defaultLng}`,
          center: [defaultLat, defaultLng]
        })

        console.log(`Default geolocation is ${defaultLng}, ${defaultLat}`);
                // call getRestaurant() to make http post request
        this.props.getRestaurantData({
          defaultLat, defaultLng
        });
    }

    componentDidMount() {
        if (navigator.geolocation && this.props.user.hasGeolocation) {
            this.getUserLocation();
        } else if (this.state.center && this.state.userLocation) {
            this.reloadNewRestaurant();
        } else {
            this.defaultLocation();
        }
    }

    render() {
        var REDIRECT_COMPONENT, MAP_LOADING_COMPONENT;
        if (this.state.hasError) {
            REDIRECT_COMPONENT = <Redirect to={{
                pathname: '/error',
                state: {error: this.state.errorMsg}
            }} />
        } else {
            MAP_LOADING_COMPONENT = this.state.center && this.state.userLocation ? <Map
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
                {REDIRECT_COMPONENT}
                {MAP_LOADING_COMPONENT}
            </div>
        )
    }
}

const mapStateToProps = state => ({
  user: state.handleActionsReducer.user,
  restaurant: state.handleActionsReducer.restaurant
})

const mapDispatchToProps = dispatch => ({
  updateUserLocation: (payload) => dispatch(updateUserLocation(payload)),
  getRestaurantData: (coords) => dispatch(getRestaurantData(coords))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);