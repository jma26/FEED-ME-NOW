import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from '../Home/Home';
import Landing from '../Landing/Landing';
import Location from '../Location/Location';
import Error from '../Common/Error/Error';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route path="/home" component={props => <Home {...props} />} />
          <Route path="/location" component={Location} />
          <Route path="/error" component={Error} />
        </Switch>
      </div>
    );
  }
}

export default App;
