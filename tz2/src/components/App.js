import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'

import Home     from './routes/Home/Home'
import Gallery  from './routes/Gallery/Gallery'
import Techs    from './routes/Techs/Techs'
import AboutMe  from './routes/AboutMe/AboutMe'
import Resume   from './routes/Resume/Resume'
import Contact  from './routes/Contact/Contact'

import Header   from './Header/Header'
import Footer   from './Footer/Footer'

import './App.css'

const App = () => (

  <div className="main-wrapper">

    <Header />

    <div className='page'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'         component={Home} />
          <Route exact path='/techs'    component={Techs} />
          <Route exact path='/gallery'  component={Gallery} />
          <Route exact path='/aboutme'  component={AboutMe} />
          <Route exact path='/resume'   component={Resume} />
          <Route exact path='/contact'  component={Contact} />

          <Redirect from='*' to='/' />
        </Switch>
      </BrowserRouter>
    </div>

    <Footer />

  </div>
)

export default App
