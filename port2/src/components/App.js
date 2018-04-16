import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Home     from './Home/Home'
import Gallery  from './Gallery/Gallery'
import Techs    from './Techs/Techs'
import AboutMe  from './AboutMe/AboutMe'
import Resume   from './Resume/Resume'
import Contact  from './Contact/Contact'

import Header   from './Header/Header'
import Footer   from './Footer/Footer'

import './App.css'

const App = () => (

  <div className="main-wrapper">

    <Header />

    <div className='page'>
      <Switch>
        <Route exact path='/'         component={Home} />
        <Route exact path='/gallery'  component={Gallery} />
        <Route exact path='/techs'    component={Techs} />
        <Route exact path='/aboutme'  component={AboutMe} />
        <Route exact path='/contact'  component={Contact} />
        <Route exact path='/resume'   component={Resume} />

        <Redirect from='*' to='/' />
      </Switch>
    </div>

    <Footer />

  </div>
)

export default App
