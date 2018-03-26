import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Header from './Header/Header'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Data from './Data/Data'
import { USER_REGISTER_URL, AUTH_LOGIN_URL, AUTH_LOGOUT_URL, AUTH_CHECKJWT_URL } from '../constants/routes'
import { LOCAL_STORAGE_KEY } from '../constants/auth'
import { METHOD_GET, METHOD_POST } from '../constants/api'
import './App.css'
import { log } from '../ke-utils'

// Styles
const appStyle = {
  backgroundColor: 'rgb(38, 39, 44)',
  color: 'white',
}


const fetchJson = async (url, method, body, headers) => {
  log('1', '', 'orange')
  log('url', url, 'blue')
  log('method', method, 'blue')
  log('body', body, 'blue')
  log('headers', headers, 'blue')
  headers = { 'Content-Type': 'application/json', ...headers }

  let fetchOptions = { method, headers }

  if (method!=="GET")
    fetchOptions = { ...fetchOptions, body: body && JSON.stringify(body) }

  log('fetchOptions', fetchOptions, 'blue')
  const response = await fetch(
    url, fetchOptions
  )
  log('2', '', 'orange')
  if (response.status === 200) {
    log('3', '', 'orange')
    return await response.json()
  }
  log('4', '', 'orange')
  throw new Error(response.status)
  log('5', '', 'orange')
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      userData: {}
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  async componentDidMount() {
    let token = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (token) {
      this.setState({ token })
      const json = await fetchJson(AUTH_CHECKJWT_URL, METHOD_GET, null, { Authorization: token })
      if (json && json.user) {
        this.setState({ userData: json.user })
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
      }
    } else {
      // this.setState({ userData: {} }) // clear userData if no token?
      // do nothing
    }
  }

  handleRegister = async (userData) => {
    const json = await fetchJson(USER_REGISTER_URL, METHOD_POST, userData).catch((err) => { console.log(err); });
    // console.log('json', json)
    log('json', json, 'blue')
    if (json && json.user) {
      log(`SUCCESS: user '${json.user.username}' registered`, '', 'green')
    } else {
      console.error('ERROR, registering user failed')
    }
  }
  // Login
  handleLogin = async (userData) => {
    const json = await fetchJson(AUTH_LOGIN_URL, METHOD_POST, userData).catch((err) => { console.log(err); });
    if (json && json.user) {
      this.setState({ userData: json.user, token: "JWT " + json.token })
      localStorage.setItem(LOCAL_STORAGE_KEY, "JWT " + json.token)
      log(`SUCCESS: user '${json.user.username}' logged in`, '', 'green')
    } else {
      console.error('login failed')
    }
  }

  handleLogout = async () => {
    const json = await fetchJson(AUTH_LOGOUT_URL, METHOD_GET).catch((err) => { console.log(err); });

    console.log('logout', json)
    if (json && json.msg) {
      log('json.msg', json.msg, 'blue')
      this.setState({ userData: {}, token: '' })
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      log(`SUCCESS: user is logged out`, '', 'green')
    } else {
      console.error('login failed')
    }
  }


  render() {
    return (
      <Router>
        <div id="App" style={appStyle}>
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
          <footer>

          </footer>
        </div>
      </Router>
    )
  }
}

export default App
