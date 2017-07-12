import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import Metar from '../components/Metar'

class MetarList extends React.Component {

  loadMetar(icao) {
    const { dispatch } = this.props
    dispatch(actions.fetchMetar(icao))
  }

  render() {
    return (
      <div>
        {this.props.metarList.metars.map((metar) => {
          return (
            <Metar
              key={metar.icao}
              distance={metar.distance}
              direction={metar.bearing}
              error={metar.error}
              icao={metar.icao}
              isFetching={metar.isFetching}
              isFailed={metar.isFailed}
              onMount={() => { this.loadMetar(metar.icao)}}
              rawReport={metar.rawReport}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    metarList: state.metarList
  }
}

export default connect(
  mapStateToProps
)(MetarList)
