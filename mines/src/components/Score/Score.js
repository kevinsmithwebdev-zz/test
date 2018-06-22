import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Score.css'


class Score extends Component {
  render() {
    console.log('score', this.props)
    return (
      <div id="Score">
        <p>Score = {this.props.score}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  score: state.score,
})


export default connect(mapStateToProps)(Score)
