import React from 'react'
import Metar from '../components/Metar'
import { connect } from 'react-redux'

const MetarList = (props) => {
  return (
    <div>
      {props.metars.map((metar) => {
        return (
          <Metar
            key={metar.icao}
            distance={metar.distance}
            direction={metar.bearing}
            rawReport={metar.rawReport}
            error={metar.error}
            isFetching={metar.isFetching}
            isFailed={metar.isFailed}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    metars: state.metars
  }
}

export default connect(
  mapStateToProps
)(MetarList)
