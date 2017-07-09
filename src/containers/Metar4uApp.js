import React from 'react'
import { connect } from 'react-redux'
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

export default connect()(Metar4uApp)
