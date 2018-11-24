import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

class Error extends Component {
    render() {
        return (
            <div className="Error">
                <div class="error__notfound">
                    <div class="error__notfound-404">
                        <h3>Oops!</h3>
                        <h1><span>2</span><span>0</span><span>4</span></h1>
                    </div>
                    <h2 className="error__headline--color">{this.props.location.state.error}</h2>
                    <button className="error__location-btn">
                        <Link to={{pathname: "/location", state: {isSharingGeolocation: false}}} style={{textDecoration: 'none', color: 'black'}}>Click here to enter your location</Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default Error;