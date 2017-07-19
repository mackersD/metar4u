import React from 'react'
import { connect } from 'react-redux'
import MetarText from './MetarText'
import Vector from './Vector'
import Spinner from './Spinner'
import * as actions from '../actions/actions'


class Metar extends React.Component {

  componentDidMount() {
    this.props.fetchMetar(this.props.icao)
  }

  render() {
    return (
      <div className="metar">
        <Spinner
          isFetching={this.props.isFetching}
          isFailed={this.props.isFailed}
        >
          <Vector
            distance={this.props.distance}
            direction={this.props.direction}
          />
          <MetarText
            text={this.props.rawReport}
          />
        </Spinner>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMetar: (icao) => dispatch(actions.fetchMetar(icao))
})

export default connect(
  null,
  mapDispatchToProps
)(Metar)
