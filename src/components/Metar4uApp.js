import React from 'react'
import MetarLookup from './MetarLookup'

class Metar4uApp extends React.Component {
  render() {
    return (
      <div>
        <MetarLookup
          defaultMetarCount={10}
        />
      </div>
    )
  }
}

export default Metar4uApp
