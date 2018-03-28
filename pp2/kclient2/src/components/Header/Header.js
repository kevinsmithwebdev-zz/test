import React from 'react'
import { Link } from 'react-router-dom'
import iLogo from './tvc-logo.png'
import './Header.css'

const logoStyle = {
  maxWidth: '200px',
}
const headerStyle = {
  display: 'flex',
  flexFlow: 'column nowrap'
}
const navRowStyle = {
  display: 'flex',
  // justifyContent: 'center',
  alignItems: 'center',
}
const titleStyle = {
  fontSize: '30px',
  fontWeight: 'bold',
  flexBasis: '50%',
}
const navStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexBasis: '50%',
}
const welcomeStyle = {
  fontStyle: 'italic',
  fontSize: '20px',
}
const linkStyle = {
  margin: '0 20px'
}

class Header extends React.Component {

  render() {
    const isLoggedIn = !!this.props.username

    return (
      <div id="Header" style={headerStyle}>
        <a href='http://trivalleycoders.com'><img src={iLogo} style={logoStyle} alt='tvc logo' /></a>

        <div style={navRowStyle}>
          <div style={titleStyle}>TVC Passport Tut</div>
          <div style={navStyle}>
            <Link style={linkStyle} to="/">HOME</Link>
            { isLoggedIn
              ? <Link style={linkStyle} to="/" onClick={this.props.handleLogout} >LOGOUT</Link>
              : (
                  <React.Fragment>
                    <Link style={linkStyle} to="/login">LOGIN</Link>
                    <Link style={linkStyle} to="/register">REGISTER</Link>
                  </React.Fragment>
                )
            }
          </div>
        </div>
        <div style={welcomeStyle} >
          {
            isLoggedIn
            ? <span style={{color: 'green'}}> 'Welcome, {this.props.username}.'</span>
            : <span style={{color: 'red'}}>'Not logged in.'</span>
          }
        </div>
      </div>
    )
  }
}

export default Header
