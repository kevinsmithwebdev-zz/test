import React from 'react'
import { connect } from 'react-redux'
import './Board.css'

import Cell from './Cell/Cell'

class Board extends React.Component {

  renderBoard = (board) => {
    return board.map((r, idx) => (
      <div className='grid-row' key={idx}>
        { r.map(c => <Cell key={c.id} data={c} />) }
      </div>
    ))
  }

  render() {
    return (
      <div id="Board">
        { this.renderBoard(this.props.grid) }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  grid: state.grid,
})


export default connect(mapStateToProps)(Board)
