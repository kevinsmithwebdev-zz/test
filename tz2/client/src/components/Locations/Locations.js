import React from 'react'

import Location from './Location/Location'

import './Locations.css'

const Locations = () => {
  return (
    <section id="Locations">
      <Location loc={1} />
      <Location loc={2} />
    </section>
  )
}
export default Locations
