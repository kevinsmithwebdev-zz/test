import React from 'react'

import Location from './Location/Location'

import './Locations.css'

const Locations = () => {
  return (
    <section id="Locations">
      <Location locSlot={0} />
      <Location locSlot={1} />
    </section>
  )
}
export default Locations
