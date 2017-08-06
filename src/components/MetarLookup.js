import React from 'react'
import { connect } from 'react-redux'
import MetarList from './MetarList'
import LocationLookup from './LocationLookup'
import { getLocation } from '../util/location'
import * as actions from '../actions/actions'

class MetarLookup extends React.Component {

  componentDidMount() {
    getLocation((data, err) => {
      if(err) {
        alert(err)
      }
      else {
        this.props.changeLocation(data.coords.latitude, data.coords.longitude)
      }
    })
  }

  render() {
    return (
      <div>
        <LocationLookup />
        <MetarList />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeLocation: (lat, long) => dispatch(actions.changeLocation(lat, long))
})

export default connect(
  null,
  mapDispatchToProps
)(MetarLookup)
