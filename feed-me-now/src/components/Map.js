import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    componentDidMount() {
        window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_API_KEY;
        window.L.mapquest.map('map', {
            center: this.state.center,
            layers: window.L.mapquest.tileLayer(this.state.baseLayer),
            zoom: this.state.zoom,
        });
    }

    render() {
        const mapStyle = {
            height: this.state.height,
            width: this.state.width
        }
        return (
            <div className="Map">
                <div id="map" style={mapStyle}></div>
            </div>
        )
    }
}

export default Map;