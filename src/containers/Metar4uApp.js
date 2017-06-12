import React from 'react'
import { connect } from 'react-redux'
import MetarList from '../components/MetarList'
import { fetchWeatherIfNeeded, fetchGeolocation } from '../actions/actions'

class Metar4uApp extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchWeatherIfNeeded())
    dispatch(fetchGeolocation())
  }

  render() {
    return (
      <div>
        Metar4uApp
        <MetarList />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps)(Metar4uApp)
