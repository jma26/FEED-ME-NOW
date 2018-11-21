import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'userLocation': ''
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="Location">
                <h2> Enter your location </h2>
                <input type="text" name="userLocation" value={this.state.userLocation} onChange={(e) => this.onChange(e)} />
                <button className="location__location-btn">
                    <Link to={{pathname: "/home", state: {isSharingGeolocation: false, isManuallyLocated: true} }}>Find new restaurant</Link>
                </button>
            </div>
        )
    }
}

export default Location;