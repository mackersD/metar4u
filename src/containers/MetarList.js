import React from 'react'
import Metar from '../components/Metar'
import { connect } from 'react-redux'

const MetarList = ({metars, locations}) => {
  return (
    <div>
      {metars.map((metar) => {
        var station = locations.find((loc) => loc.icao === metar.icao)
        return (
          <Metar
            key={metar.icao}
            distance={station.statuteMiles}
            direction={station.bearing}
            report={metar['Raw-Report']}
            error={metar.error}
            isFetching={metar.isFetching}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    metars: state.metars,
    locations: state.location.nearestStations
  }
}

export default connect(
  mapStateToProps
)(MetarList)
