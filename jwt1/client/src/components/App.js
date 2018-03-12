import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Home from './Home/Home'
import Login from './Login/Login'
import Data from './Data/Data'

import { AUTH_LOGIN_URL, AUTH_LOGOUT_URL } from '../constants/constants'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      userData: {}
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    console.log('App.constructor')

  }

  handleLogin(userData) {
    console.log('in handleLogin', userData)
    fetch(
      AUTH_LOGIN_URL,
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    .then((response) => {
      console.log('login response', response)
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      console.log('login return', json)
      if (json.user) {
        this.setState({ userData: json.user, token: json.token });
      } else {
        console.error('login failed')
      }
    })
    .catch((err) => {
      console.error('error logging in', err)
    });
  }


  async handleLogout() {
    console.log('in App.handleLogout...')
    // console.log(userData)

    await fetch(AUTH_LOGOUT_URL)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      this.setState({ userData: {}, token: '' })
    })
    .catch((err) => {
      console.error('error logging in', err)
    });

  }


  render() {
    return (
      <Router>
        <div id="App">

          <Header
            username={this.state.userData.username}
            handleLogout={this.handleLogout}
          />

          <Switch>

            <Route exact path="/" component={Home} />

            <Route exact path="/data"
              render={() => (
                <Data
                  token={this.state.token}
                />
              )}
            />

            {/* component={Data} /> */}

            <Route
              exact path="/login"
              render={() => (
                <Login
                  handleLogin={this.handleLogin}
                />
              )}
            />

            <Redirect from="*" to="/" />

          </Switch>

        </div>
      </Router>
    );
  }
}

export default App
