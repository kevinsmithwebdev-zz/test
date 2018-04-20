import React from 'react'
import { connect } from 'react-redux'

class Map extends React.Component {

  render() {
    const renderedTimes = []

    for (let i=0; i<24; i++) {
      renderedTimes.push(
        <li>

        </li>
      )
    }

    let UTC1 = new Date().getTime()
    let UTC2 = new Date().getDay()
    let UTC3 = new Date().getHours()
    console.log('UTC1', UTC1)
    console.log('UTC2', UTC2)
    console.log('UTC3', UTC3)
    // console.log(new Date.getTime())
    // console.log(UTC.getHours())

    return (
      <h3>asdf</h3>
    )
  }
}


function mapStateToProps(state) {
  return { locations: state.locations }
}

export default connect(mapStateToProps)(Map)
