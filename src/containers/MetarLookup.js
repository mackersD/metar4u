import React from 'react'
import { connect } from 'react-redux'
import MetarList from './MetarList'
import LocationLookup from './LocationLookup'
import { bootstrapLocationAndMetars } from '../actions/actions'

class MetarLookup extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(bootstrapLocationAndMetars(this.props.defaultMetarCount))
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

export default connect()(MetarLookup)
