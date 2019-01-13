import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Landing from './components/Landing';
import Location from './components/Location';
import Error from './components/Error';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={ Landing} />
                <Switch>
                    <Route path="/home" component={props => (
                        <Home timestamp={new Date().toString()} {...props} />
                    )} />
                    <Route path="/location" component={ Location } />
                    <Route path="/error" component={ Error } />
                </Switch>
            </div>
        );
    }
}

export default App;
