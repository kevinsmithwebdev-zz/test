import React from 'react'
import { connect } from 'react-redux'

import './Times.css'

const Map = ({ locations }) => {

  const renderedTimesArr = []

  const HOUR = 60*60*1000

  const timeStr = (h) => `${(h+11)%12+1}${((h+24)%24)/12<1?'am':'pm'}`

  let UTC = Math.floor((new Date().getTime())/HOUR)*HOUR

  console.log('UTC', UTC)

  let tz1 = UTC + locations[0].rawOffset*HOUR + locations[0].dstOffset*HOUR
  let tz2 = UTC + locations[1].rawOffset*HOUR + locations[1].dstOffset*HOUR

  console.log('test1', tz1)
  console.log('test1', new Date(tz1).getHours())
  console.log('test2', tz2)
  console.log('test2', new Date(tz2).getHours())




  // console.log('tz1', tz1)
  // console.log('tz1', new Date(tz1).getHours())
  // console.log('tz2', tz2)
  // console.log('tz2', new Date(tz2).getHours())





  let utcHour = new Date().getUTCHours()
  let utcDay = new Date().getUTCDay()

  let tz1Hour = utcHour + locations[0].rawOffset + locations[0].dstOffset
  let tz2Hour = utcHour + locations[1].rawOffset + locations[1].dstOffset



  console.log('tz1Hour', tz1Hour)
  console.log('tz2Hour', tz2Hour)


  for (let i=0; i<24; i++) {
    renderedTimesArr.push(
      <div key={i} className="time-wrapper">
        <span className="blue-text">{timeStr(tz1Hour+i)}</span> - <span className="green-text">{timeStr(tz2Hour+i)}</span>
      </div>
    )
  }

  return (
    <div id="Times">
      {renderedTimesArr}
    </div>
  )

}


function mapStateToProps(state) {
  return { locations: state.locations }
}

export default connect(mapStateToProps)(Map)
