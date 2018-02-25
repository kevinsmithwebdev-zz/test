import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Home from './Home/Home'
import Login from './auth/Login/Login'
import Logout from './auth/Logout/Logout'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="App">
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/logout" component={Logout} />
            <Redirect from="*" to="/" />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App
