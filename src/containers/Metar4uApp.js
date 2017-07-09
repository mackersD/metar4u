import React from 'react'
import { connect } from 'react-redux'
import MetarLookup from './MetarLookup'

import { bootstrapLocationAndMetars } from '../actions/actions'

class Metar4uApp extends React.Component {
  render() {
    return (
      <div>
        <MetarLookup
          defaultMetarCount={5}
        />
      </div>
    )
  }
}

export default connect()(Metar4uApp)
