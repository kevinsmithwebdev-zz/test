import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Home from './Home/Home'
import Login from './auth/Login/Login'
import Logout from './auth/Logout/Logout'

import './App.css';

class App extends Component {

  componentWillMount() {
    console.log('App - CWM')
    fetch('http://localhost:8080/auth/check')
    .then((resp) => {
      console.log(resp)
      console.log(resp.headers.get('Content-Type'))
      return resp.json()
    })
    .then(function(data) {
      console.log('JSON return...')
      console.log(data)
    })




  }

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
