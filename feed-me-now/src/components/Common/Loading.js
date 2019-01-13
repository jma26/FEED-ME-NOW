import React, { Component } from 'react';
import '../../css/Common/Loading.css';

class Loading extends Component {
    render() {
        return (
            <div className="Loading">
                <div className="Loading__spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default Loading;