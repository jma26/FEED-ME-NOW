import React, { Component } from 'react';
import '../../css/App/App.css';
import { Route, Switch } from 'react-router-dom';

import Home from '../Common/Home';
import Landing from '../Landing/Landing';
import Location from '../Location/Location';
import Error from '../Common/Error';

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
