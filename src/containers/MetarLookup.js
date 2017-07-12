import React from 'react'
import { connect } from 'react-redux'
import MetarList from '../containers/MetarList'
import LocationLookup from './LocationLookup'
import { bootstrapLocationAndMetars } from '../actions/actions'
import { getLocation } from '../util/location'
import * as actions from '../actions/actions'

class MetarLookup extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    
    //default the list to current Geolocation
    getLocation((pos) => {
      dispatch(actions.changeLocation(pos.coords.latitude, pos.coords.longitude))
    })
  }

  render() {
    return (
      <div>
        <MetarList />
      </div>
    )
  }
}

export default connect()(MetarLookup)
