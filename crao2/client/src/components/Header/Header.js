import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userUpdate } from '../../redux/actions/actions'

import './Header.css'

class Header extends React.Component {
  render() {
    console.log('Header')
    console.log(this.props)
    return (
      <div id="Header">
        <span className="name">
          <div className="title">Boilerplate CRA and OAuth App</div>
          <div className="welcome">
            {
              this.props.user.username
              ? 'Welcome, ' + this.props.user.username + '.'
              : 'Not logged in.'
            }
          </div>
        </span>

        <span className="nav">
          <Link to="/">HOME</Link>
          <Link to="/auth/login">LOGIN</Link>
          <Link to="/auth/logout">LOGOUT</Link>
        </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userUpdate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
