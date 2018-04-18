import React from 'react'

import './Location.css'


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLoc: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e) {
    console.log('click', e.target.value)
  }

  handleChange(e) {
    console.log('key', e.target)
  }

  // updateInputValue(field, e) {
  //    let newFields = this.state.inputFields
  //    newFields[field] = e.target.value
  //    this.setState({
  //      inputFields: newFields
  //    })
  //  }

  render() {
    return (
      <div id="Location">
        <span>Location: </span>
        <span>{this.props.loc}</span>
        <form>
          Location:<br />
          <input type="text" name="location" value={this.state.newLoc} onChange={this.handleChange} />
          <span className="submitBtn" onClick={this.handleClick}>+</span>
        </form>
      </div>
    )
  }
}
export default Location
