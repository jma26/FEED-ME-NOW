import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateUserLocation, getRestaurantData } from '../../redux/actions';

import Map from '../Map/Map';
import Loading from '../Common/Loading/Loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          restaurant: null,
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
    }

    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        
        this.props.getRestaurantData({
          lat, 
          lng
        });
        
        this.props.updateUserLocation({
          coordinates: `${lat}, ${lng}`,
          center: [lat, lng]
        })

        console.log(`User's geolocation is ${lng}, ${lat}`);
        // call getRestaurant() to make http post request
    }

    getUserLocation() {
      console.log('Retrieving user location...');
        // Check if API is available on user's browsers
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }

    reloadNewRestaurant() {
        this.props.getRestaurantData({
          lat: this.props.user.center[0], 
          lng: this.props.user.center[1]
        });
    }

    defaultLocation() {
        const defaultLng = -122.083855;
        const defaultLat = 37.386051;
        
        this.props.updateUserLocation({
          coordinates: `${defaultLat}, ${defaultLng}`,
          center: [defaultLat, defaultLng]
        })

        // call getRestaurant() to make http post request
        this.props.getRestaurantData({
          lat: defaultLat,
          lng: defaultLng
        });

        console.log(`Default geolocation is ${defaultLng}, ${defaultLat}`);
    }

    componentDidMount() {
      this.setState({
        restaurant: this.props.restaurant
      });
      if (navigator.geolocation && this.props.user.hasGeolocation) {
          this.getUserLocation();
      } else if (this.props.user.center && this.props.user.coordinates) {
          this.reloadNewRestaurant();
      } else {
          this.defaultLocation();
      }
    }

    render() {
        var REDIRECT_COMPONENT, MAP_LOADING_COMPONENT;
        if (this.props.error.hasError) {
            REDIRECT_COMPONENT = <Redirect to={{
                pathname: '/error',
                state: {error: this.props.error.msg}
            }} />
        } else {
            MAP_LOADING_COMPONENT = this.state.restaurant && (this.state.restaurant !== this.props.restaurant) && this.props.user.center ? <Map
                height={'100vh'}
                width={'100%'}
                center={this.props.user.center}
                baseLayer={'map'}
                zoom={14}
                restaurant={this.props.restaurant}
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
  error: {
    msg: state.handleActionsReducer.errorMsg,
    hasError: state.handleActionsReducer.hasError
  },
  user: state.handleActionsReducer.user,
  restaurant: state.handleActionsReducer.restaurant,
})

const mapDispatchToProps = dispatch => ({
  updateUserLocation: (payload) => dispatch(updateUserLocation(payload)),
  getRestaurantData: (coords) => dispatch(getRestaurantData(coords))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);