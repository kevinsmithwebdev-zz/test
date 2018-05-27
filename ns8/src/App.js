import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import H1 from './H1'

import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
`

const AppLogo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <header className="App-header">
          <AppLogo src={logo} alt="logo" />
          <H1>Welcome to React</H1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </Wrapper>
    );
  }
}

export default App;
