import React from 'react'
import { connect } from 'react-redux'
import MetarList from './MetarList'
import { bootstrapLocationAndMetars } from '../actions/actions'

class Metar4uApp extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(bootstrapLocationAndMetars())
  }

  render() {
    return (
      <div>
        <MetarList />
      </div>
    )
  }
}

export default connect()(Metar4uApp)
