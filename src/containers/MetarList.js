import React from 'react'
import Metar from '../components/Metar'
import { connect } from 'react-redux'

const MetarList = ({metars}) => (
  <ul>
    {metars.map((metar) => {
      return (
        <Metar
          key={metar.icao}
          report={metar['Raw-Report']}
          error={metar.error}
          isFetching={metar.isFetching}
        />
      )
    })}
  </ul>
)

const mapStateToProps = state => {
  return {
    metars: state.metars
  }
}

export default connect(
  mapStateToProps
)(MetarList)
