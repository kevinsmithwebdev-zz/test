import React from 'react'

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.handleLeftClick = this.handleLeftClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
  }

  handleLeftClick() {
    console.log('left click', this.props.data.id)
  }

  handleRightClick(e) {
    e.preventDefault()
    console.log('right click', this.props.data.id)
  }

  render() {
    let v
    let classStr = ''
    switch (this.props.data.value) {
      case 9:
        v = 'B'
        break
      case 0:
        v = ' '
        break
      default:
        v = this.props.data.value
        classStr = `grid-cell-${this.props.data.value}`
    }
    return (
      <span
        className={`grid-cell ${classStr}`}
        key={this.props.data.id}
        onClick={this.handleLeftClick}
        onContextMenu={this.handleRightClick}
      >
        {v}
      </span>
    )
  }
}

export default Cell
