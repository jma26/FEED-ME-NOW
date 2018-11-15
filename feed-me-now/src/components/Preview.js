import React, { Component } from 'react';
import './Preview.css';
import { Link } from 'react-router-dom';

const logoPath = process.env.PUBLIC_URL + '/assets/imgs/logo.svg';

class Preview extends Component {
    render() {
        return (
            <div className="Preview">
                <h1 className="Preview__intro animated bounceInDown"> FEED ME NOW is an awesome web app for those who can't decide where to eat. </h1> 
                <h1 className="Preview__intro--mobile-content animated bounceInDown"> FEED ME NOW </h1>
                <h2 className="Preview__content animated bounceInUp"> Click accept to share your location or decline to manually input it. </h2>
                <div className="Preview__logo-container animated fadeIn">
                    <img src={`${logoPath}`} alt="Brand logo" className="Preview__logo" />
                </div>
                <div className="Preview__btns">
                    <button className="Preview__btn--green preview-btns">
                        <Link to={{pathname: "/home", state: {isSharingGeolocation: true} }} style={{textDecoration: 'none', color: '#FFF'}}> Accept </Link>
                    </button>
                    <button className="Preview__btn--red preview-btns">
                        <Link to={{pathname: "/home", state: {isSharingGeolocation: false} }} style={{textDecoration: 'none', color: '#FFF'}}> Decline </Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default Preview;