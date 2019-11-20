import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Landing.css';

import { handleGeolocation } from '../../redux/actions/';

const logoPath = process.env.PUBLIC_URL + '/assets/imgs/logo.svg';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <h1 className="Landing__intro">
          FEED ME NOW is an awesome web app for those who can't decide where to
          eat.
        </h1>
        <h1 className="Landing__intro--mobile-content"> FEED ME NOW </h1>
        <h2 className="Landing__content">
          Click accept to share your location or decline to manually input it.
        </h2>
        <div className="Landing__logo-container">
          <img src={`${logoPath}`} alt="Brand logo" className="Landing__logo" />
        </div>
        <div className="Landing__btns">
          <Link
            to={{ pathname: '/home' }}
            onClick={() => this.props.handleGeolocation(true)}
            style={{ textDecoration: 'none', color: '#FFF' }}
            className="Landing__btn--green Landing-btns"
          >
            Accept
          </Link>
          <Link
            to={{ pathname: '/home' }}
            onClick={() => this.props.handleGeolocation(false)}
            style={{ textDecoration: 'none', color: '#FFF' }}
            className="Landing__btn--red Landing-btns"
          >
            Decline
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleGeolocation: bool => dispatch(handleGeolocation(bool)),
});

export default connect(null, mapDispatchToProps)(Landing);
