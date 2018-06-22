import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Board.css';


class Board extends Component {

  renderBoard = (board) => {
    const renderCell = c => {
      let v
      switch (c.value) {
        case -1:
          v = 'B'
          break
        case 0:
          v = ' '
          break
        default:
          v = c.value
      }
      return <span className='grid-cell' key={c.id}>{v}</span>
    }

    return board.map((r, idx) => (
      <div className='grid-row' key={idx}>
        { r.map(c => renderCell(c)) }
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
