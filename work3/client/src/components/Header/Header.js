import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

class Header extends React.Component {

  render() {
    const isLoggedIn = !!this.props.username

    return (
      <div id="Header">
        <span className="name">
          <div className="title">TVC Passport Tut</div>
          <div className="welcome">
            {
              isLoggedIn
              ? 'Welcome, ' + this.props.username + '.'
              : 'Not logged in.'
            }
          </div>
        </span>

        <span className="nav">
          <Link to="/">HOME</Link>
          { isLoggedIn
            ? <Link to="/" onClick={this.props.handleLogout} >LOGOUT</Link>
            : (
                <React.Fragment>
                  <Link to="/login">LOGIN</Link>
                  <Link to="/register">REGISTER</Link>
                </React.Fragment>
              )
          }
        </span>
      </div>
    )
  }
}

export default Header
