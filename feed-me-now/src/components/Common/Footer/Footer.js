import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <button className="footer__dislike-btn blk-bg">
          <Link
            to={{ pathname: '/home' }}
            style={{ textDecoration: 'none', color: '#FFF' }}
          >
            No, I don't want that
          </Link>
        </button>
        <div className="footer-container">
          <div className="footer-container__social">
            <a
              href="https://github.com/jma26"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-container__social-link">
              <FontAwesomeIcon
                icon={faGithub}
                size="lg"
                className="footer-container__icons social-links--hyperlink"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/jesse-ma-b2522b84/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-container__social-link" >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="lg"
                className="footer-container__icons social-links--hyperlink" 
              />
            </a>
            <p className="footer-container__content">Jesse Ma</p>
          </div>
          <Link
            to={{ pathname: '/location' }}
            style={{ textDecoration: 'none' }}
            className="footer-container__location-btn"
          >
            Change Location
          </Link>
        </div>
      </div>
    );
  }
}

export default Footer;
