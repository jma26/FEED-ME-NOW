import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null
         };
         this.loadDirections=this.loadDirections.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.userLocation !== nextProps.userLocation) {
            this.setState({
                userLocation: nextProps.userLocation
            }, this.loadDirections)
        }
    }

    loadDirections() {
        console.log(this.state.userLocation);
        window.L.mapquest.directions().route({
            start: `${this.state.userLocation}`,
            end: '38.447536, -122.701134'
        })
    }

    componentDidMount() {
        window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_API_KEY;
        window.L.mapquest.map('map', {
            center: this.props.center,
            layers: window.L.mapquest.tileLayer(this.props.baseLayer),
            zoom: this.props.zoom,
        });
        let directions = window.L.mapquest.directions();
        directions.setLayerOptions({
            startMarker: {
                draggable: false
            },
            endMarker: {
                draggable: false
            },
            routeRibbon: {
                draggable: false
            }
        })
    }

    render() {
        const mapStyle = {
            height: this.props.height,
            width: this.props.width
        }
        return (
            <div className="Map">
                <div id="map" style={mapStyle}></div>
            </div>
        )
    }
}

export default Map;