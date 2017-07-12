import React from 'react'
import MetarText from './MetarText'
import Vector from './Vector'
import Spinner from './Spinner'


class Metar extends React.Component {

  componentDidMount() {
    if(this.props.onMount && typeof(this.props.onMount === 'function')) {
      this.props.onMount()
    }
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

export default Metar
