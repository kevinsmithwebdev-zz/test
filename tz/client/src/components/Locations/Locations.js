import React from 'react'

import Location from './Location/Location'

import './Locations.css'

const Locations = () => {
  return (
    <section id="Locations">
      <Location loc={"Oakland, CA"} />
      <Location loc={"Barcelona, Esp"} />
    </section>
  )
}
export default Locations
