import React, { Component } from 'react';

const logoPath = process.env.PUBLIC_URL + '/assets/imgs/logo.png';

class Preview extends Component {
    render() {
        return (
            <div className="Preview">
                <img src={`${logoPath}`} alt="Brand logo" />
            </div>
        )
    }
}

export default Preview;