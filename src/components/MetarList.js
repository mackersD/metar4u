import React from 'react'
import { connect } from 'react-redux'
import Metar from './Metar'

class MetarList extends React.Component {

  render() {
    return (
      <div className="metarList">
        <div className="location">
          {"Latitude:" + this.props.metarList.lat + " Longitude: " + this.props.metarList.long}
        </div>
        {this.props.metarList.metars.map((metar, index) => {
          return (
            <Metar
              key={metar.icao + this.props.metarList.updatedAt}
              distance={metar.distance}
              direction={metar.bearing}
              error={metar.error}
              icao={metar.icao}
              isFetching={metar.isFetching}
              isFailed={metar.isFailed}
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
