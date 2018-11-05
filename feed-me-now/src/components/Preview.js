import React, { Component } from 'react';
import './Preview.css';
import { Link } from 'react-router-dom';

const logoPath = process.env.PUBLIC_URL + '/assets/imgs/logo.png';

class Preview extends Component {
    render() {
        return (
            <div className="Preview">
                <h1 className="Preview__intro"> FEED ME NOW is an awesome web app for those who can't decide where to eat. </h1> 
                <h1 className="Preview__intro--mobile-content"> FEED ME NOW </h1>
                <h2 className="Preview__content"> Click accept to share your location or decline to manually input it. </h2>
                <img src={`${logoPath}`} alt="Brand logo" />
                <div className="Preview__btns">
                    <button className="Preview__btn--green preview_btns">
                        <Link to={{pathname: "/home", state: {isSharingGeolocation: 'true'} }} style={{textDecoration: 'none', color: '#FFF'}}> Accept </Link>
                    </button>
                    <button className="Preview__btn--red preview_btns">
                        <Link to={{pathname: "/home", state: {isSharingGeolocation: 'false'} }} style={{textDecoration: 'none', color: '#FFF'}}> Decline </Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default Preview;