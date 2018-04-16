import React from 'react'

import Brand from './Brand/Brand'
import TitleBar from './TitleBar/TitleBar'
import NavBar from './NavBar/NavBar'

import './Header.css'

const Header = () => {
  return (

    <header>
      <Brand />
      <TitleBar />
      <NavBar />
    </header>
  )
}
export default Header
