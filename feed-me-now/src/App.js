import React, { Component } from 'react';
import './App.css';

import Home from './components/Home';
import Preview from './components/Preview';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Home />
                <Preview />
            </div>
        );
    }
}

export default App;
