import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header'
import Score from './Score/Score'
import Board from './Board/Board'
import Controls from './Controls/Controls'
import Footer from './Footer/Footer'

class App extends Component {
  render() {
    console.log('hip')
    return (
      <div className="App">
        <Header />
        <Score />
        <Board />
        <Controls />
        <Footer />
      </div>
    );
  }
}

export default App;
