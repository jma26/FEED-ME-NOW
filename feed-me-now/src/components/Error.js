import React, { Component } from 'react';

class Error extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Error">
                <h1>{this.props.location.state.error}</h1>
            </div>
        )
    }
}

export default Error;