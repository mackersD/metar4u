import React from 'react'
import { connect } from 'react-redux'
import MetarList from '../containers/MetarList'
import LocationLookup from './LocationLookup'
import { getLocation } from '../util/location'
import * as actions from '../actions/actions'

class MetarLookup extends React.Component {

  constructor(props) {
    super(props)
    this.onLookupSuccess = this.onLookupSuccess.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    getLocation((pos) => {
      dispatch(actions.changeLocation(pos.coords.latitude, pos.coords.longitude))
    })
  }

  onLookupSuccess(lat, long) {
    const { dispatch } = this.props
    dispatch(actions.changeLocation(lat, long))
  }

  render() {
    return (
      <div>
        <LocationLookup
          onLookupSuccess={this.onLookupSuccess}
        />
        <MetarList />
      </div>
    )
  }
}

export default connect()(MetarLookup)
