import React, { Component } from 'react';
import './Location.css';
import axios from 'axios';

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: '',
            hasError: false
        }
    }

    findGeoLocation() {
        console.log(`Geocoding address....`);
        const MAPQUEST_GEOCODING_API_URL = 'https://www.mapquestapi.com/geocoding/v1/address';
        axios.get(`${MAPQUEST_GEOCODING_API_URL}?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${this.state.userLocation}`)
        .then((response) => {
            const geoCoordinates = response.data.results[0].locations[0].latLng;
            console.log(geoCoordinates);
            this.props.history.push({
                pathname: '/home',
                state: {
                    'userLocation': `${geoCoordinates.lat}, ${geoCoordinates.lng}`,
                    'center': [geoCoordinates.lat, geoCoordinates.lng],
                    'geolocation': false
                }
            })
            console.log(`${geoCoordinates.lat}, ${geoCoordinates.lng}`);
        })
        .catch((error) => {
            this.setState({
                hasGeoLocationError: true
            })
            console.log(error);
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="Location">
                <h2 className="Location__headline--color location__headline"> Enter your location </h2>
                <input type="text" name="userLocation" className="Location__location-input" value={this.state.userLocation} onChange={(e) => this.onChange(e)} />
                <button onClick={() => this.findGeoLocation()} disabled={!this.state.userLocation} className="Location__location-btn">Find a place to eat</button>
            </div>
        )
    }
}

export default Location;