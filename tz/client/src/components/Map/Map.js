import React from 'react'
import { connect } from 'react-redux'

import mapImg from '../../assets/images/tz.png'

import './Map.css'

class Map extends React.Component {


  render() {
    const createXStyle = (lat, lon) => {
      console.log('cxs', lat, lon)
    }

    const xStyle0 = createXStyle(this.props.locations[0].lat, this.props.locations[0].lon)
    const xStyle1 = createXStyle(this.props.locations[1].lat, this.props.locations[1].lon)
    console.log(this.props)
    return (
      <div id="Map">
        <img className="tz-map" src={mapImg} alt="time zone map" />
        <span className="pos pos-0">X</span>
        <span className="pos pos-1">X</span>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { locations: state.locations }
}

export default connect(mapStateToProps)(Map)
