import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const Header = () => {
  return (
    <div id="Header">
      <span className="name">Boilerplate CRA and OAuth App</span>
      <span className="nav">
        <Link to="/">HOME</Link>
        <Link to="/auth/login">LOGIN</Link>
        <Link to="/auth/logout">LOGOUT</Link>
      </span>
    </div>
  )
}

export default Header
