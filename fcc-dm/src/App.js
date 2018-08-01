import React, { Component } from 'react';

import './App.css';

const drumsArr = [
  {
    id: 'Heater-1',
    char: 'Q',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    id: 'Heater-2',
    char: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    id: 'Heater-3',
    char: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    id: 'Heater-4',
    char: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    id: 'Clap',
    char: 'S',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    id: 'Open-HH',
    char: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    id: "Kick-n'-Hat",
    char: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    id: 'Kick',
    char: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    id: 'Closed-HH',
    char: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
]
const validKeys = []

const DrumPad = ({ drum, handleClick }) => {
  return (
    <button
      id={drum.id}
      className='drum-pad'
      onClick={() => handleClick(drum)}
    >
      <audio className='clip' id={drum.char} src={drum.url} />
      <span className='drum-text'>{drum.char}</span>
    </button>
  )
}

class App extends React.Component {

  state = {
    soundElems: {} ,
    currentDrum: '',
    displayTimer: null,
  }

  playSound = ({ char, id, }) => {
    const audio = this.state.soundElems[char]
    audio.play()
    this.setState({ currentDrum: id })

    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0
    }, 150)

    if (this.state.displayTimer) {
      clearTimeout(this.state.displayTimer)
      this.setState({ displayTimer: null })
    }

    const newTimer = setTimeout(() => {
      this.setState({ currentDrum: '' })
    }, 1500)

    this.setState({ displayTimer: newTimer })
  }

  handleKey = e => {
    const key = e.key ? e.key.toUpperCase() : null
    const drum = drumsArr.find(d => d.char === key)
    if (drum)
      this.playSound(drum)
  }

  componentDidMount() {
    const soundElems = {}
    drumsArr.forEach(d => {
      validKeys.push(d.char)
      soundElems[d.char] = document.getElementById(d.char)
    })
    this.setState({ soundElems })

    document.addEventListener("keydown", this.handleKey.bind(this));
  }

  render() {
    return (
      <div id="drum-machine">
        <h1>Kevin's Simple Drum Machine</h1>
        <div id="display">
          {this.state.currentDrum}
        </div>
        <div id="pads">
         { drumsArr.map(d => <DrumPad drum={d} handleClick={this.playSound} key={d.char} /> ) }
       </div>
      </div>
    )
  }
}

export default App;
