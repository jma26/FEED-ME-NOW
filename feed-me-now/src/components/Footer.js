import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Footer">
                <button className="footer__btn blk-bg animated slideInRight">
                    <Link to={{pathname: "/home", state: {isSharingGeolocation: this.props.isSharingGeolocation} }} style={{textDecoration: 'none', color: '#FFF'}}> No, I don't want that </Link>
                </button>
                <div className="footer__links">
                    <p>Created by Jesse Ma</p>
                </div>
            </div>
        )
    }
}

export default Footer;