import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Preview from './components/Preview';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={ Preview } />
                <Switch>
                    <Route path="/home" component={props => (
                        <Home timestamp={new Date().toString()} {...props} />
                    )} />
                </Switch>
            </div>
        );
    }
}

export default App;
