import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Home from './Home/Home'
import Login from './auth/Login/Login'
import Logout from './auth/Logout/Logout'

import { AUTH_CHECK_URL } from '../constants/constants'

import './App.css';

class App extends Component {

  componentWillMount() {
    // console.log('App - CWM')
    // // fetch(AUTH_CHECK_URL)
    // // .then((resp) => {
    // //   console.log(resp)
    // //   console.log(resp.headers.get('Content-Type'))
    // //   return resp.json()
    // // })
    // // .then(function(data) {
    // //   console.log('JSON return...')
    // //   console.log(data)
    // // })
    // setInterval(() => {
    //
    //   fetch(AUTH_CHECK_URL, {
    //     method: 'GET',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       credentials: "same-origin"
    //     }
    //   })
    //   .then(res => res.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(response => {
    //     console.log('back from AUTH_CHECK_URL')
    //     console.log(response)
    //   })
    // }, 10000)
  }


  handleLogin(userData) {
    console.log('in App.handleLogin...')
    console.log(userData)
  }



  render() {
    return (
      <Router>
        <div id="App">
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth/login" test={127} component={Login} />
            <Route exact path="/auth/logout" component={Logout} />
            <Redirect from="*" to="/" />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App
