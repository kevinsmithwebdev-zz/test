import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Data from './Data/Data'

import { AUTH_REGISTER_URL, AUTH_LOGIN_URL, AUTH_LOGOUT_URL, AUTH_CHECKSESSION_URL } from '../constants/routes'

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

  componentDidMount() {
    console.log('cdm')

    fetch(AUTH_CHECKSESSION_URL, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      console.log('json', json)
      console.log('json.user', json.user)
      if (json && json.user)
        this.setState({ userData: json.user })
      else
        console.log('no session')
    })
    .catch((err) => {
      console.error('error logging in', err)
    })
  }

  handleRegister(userData) {
    fetch(
      AUTH_REGISTER_URL,
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      if (json.user) {
        this.setState({ userData: json.user })
      } else {
        console.error('login failed')
      }
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
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      if (json.user) {
        this.setState({ userData: json.user })
        // localStorage.setItem(LOCAL_STORAGE_KEY, json.token)
      } else {
        console.error('login failed')
      }
    })
    .catch((err) => {
      console.error('error logging in', err)
    })
  }

  handleLogout() {
    fetch(AUTH_LOGOUT_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    .then((response) => {
      if (response.status === 200)
        return response.json()
      return null
    })
    .then((json) => {
      console.log('logout json', json)
      if (json)
        this.setState({ userData: {} })
    })
    .catch((err) => {
      console.error('error loggin out', err)
    })
    this.setState({ userData: {} })
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