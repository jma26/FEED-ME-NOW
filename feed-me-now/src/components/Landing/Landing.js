import React, { Component } from 'react';
import '../../css/Landing/Landing.css';
import { Link } from 'react-router-dom';

const logoPath = process.env.PUBLIC_URL + '/assets/imgs/logo.svg';

class Landing extends Component {
    render() {
        return (
            <div className="Landing">
                <h1 className="Landing__intro animated bounceInDown"> FEED ME NOW is an awesome web app for those who can't decide where to eat. </h1> 
                <h1 className="Landing__intro--mobile-content animated bounceInDown"> FEED ME NOW </h1>
                <h2 className="Landing__content animated bounceInUp"> Click accept to share your location or decline to manually input it. </h2>
                <div className="Landing__logo-container animated fadeIn">
                    <img src={`${logoPath}`} alt="Brand logo" className="Landing__logo" />
                </div>
                <div className="Landing__btns">
                    <Link to={{pathname: "/home", state: {isSharingGeolocation: true} }} style={{textDecoration: 'none', color: '#FFF'}} className="Landing__btn--green Landing-btns"> Accept </Link>
                    <Link to={{pathname: "/home", state: {isSharingGeolocation: false} }} style={{textDecoration: 'none', color: '#FFF'}} className="Landing__btn--red Landing-btns"> Decline </Link>
                </div>
            </div>
        )
    }
}

export default Landing;