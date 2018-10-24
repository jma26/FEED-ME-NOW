import React, { Component } from 'react';
import './Preview.css';

const logoPath = process.env.PUBLIC_URL + '/assets/imgs/logo.png';

class Preview extends Component {
    render() {
        return (
            <div className="Preview">
                <h1> FEED ME NOW is an awesome web app for those who can't decide where to eat. </h1> 
                <h2> Click accept to share your location or decline to manually input it. </h2>
                <img src={`${logoPath}`} alt="Brand logo" />
                <div className="Preview__btns">
                    <input className="Preview__btn--green" type="button" value="Accept"/>
                    <input className="Preview__btn--red" type="button" value="Decline"/>
                </div>
            </div>
        )
    }
}

export default Preview;