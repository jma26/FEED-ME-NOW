import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }
    updateDimensions() {
        const height = window.innerWidth >= 700 ? window.innerHeight : 700
        const width = window.innerWidth >= 400 ? window.innerWidth : 400
        this.setState({
            height: height,
            width: width,
        })
        console.log(width, height);
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.updateDimensions.bind(this))
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this))
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