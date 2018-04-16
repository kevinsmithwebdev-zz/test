import React from 'react'
import './NavBar.css'
const navArr = ['home', 'store', 'extra', 'about', 'blog', 'contact']

const renderLink = (link, idx) => {
  let linkUrl = (link==='home') ? '/' : link
  let curPath = window.location.pathname
  let navLinkClass = 'navLink'

  if ((('/'+linkUrl)===curPath)||(curPath==='/'&&link==='home'))
    navLinkClass = 'navLinkCur'

  return (
    <li key={idx}>
      <a className={navLinkClass} href={linkUrl}>{link.toUpperCase()}</a>
    </li>
  )
}

const NavBar = () => (
  <div id='NavBar' className='navbar'>
    <ul>
      {navArr.map((link, idx) => renderLink(link, idx))}
    </ul>
  </div>
)


export default NavBar
