import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Data from './Data/Data'

import { AUTH_REGISTER_URL, AUTH_LOGIN_URL, AUTH_LOGOUT_URL } from '../constants/routes'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      userData: {}
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleRegister(userData) {
    fetch(
      AUTH_REGISTER_URL,
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include'
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      // if (json.user) {
      //   this.setState({ userData: json.user, token: json.token })
      // } else {
      //   console.error('login failed')
      // }
    })
    .catch((err) => {
      console.error('error logging in', err)
    })
  }

  handleLogin(userData) {
    fetch(
      AUTH_LOGIN_URL,
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json"
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      console.log('json returned', json)
      if (json.user) {
        this.setState({ userData: json.user, token: json.token })
      } else {
        console.error('login failed')
      }
    })
    .catch((err) => {
      console.error('error logging in', err)
    })
  }


  async handleLogout() {

    await fetch(AUTH_LOGOUT_URL)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      this.setState({ userData: {}, token: '' })
    })
    .catch((err) => {
      console.error('error logging in', err)
    })

  }


  render() {
    return (
      <Router>
        <div id="App">

          <Header
            username={this.state.userData.username}
            handleLogout={this.handleLogout}
          />
          <div className="content">
            <Switch>

              <Route exact path="/" component={Home} />

              <Route exact path="/data"
                render={() => (
                  <Data
                    user={this.state.userData}
                    token={this.state.token}
                  />
                )}
              />

              <Route
                exact path="/register"
                render={() => (
                  <Register
                    handleRegister={this.handleRegister}
                  />
                )}
              />

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
        </div>
      </Router>
    )
  }
}

export default App
