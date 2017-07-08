import React from 'react'
import Vector from './Vector'
import MetarText from './MetarText'
import Spinner from './Spinner'

const Metar = (props) => {
  return (
    <div>
      <Spinner isFetching={props.isFetching}>
        <Vector
          distance={props.distance}
          direction={props.direction}
        />
        <MetarText
          text={props.rawReport}
        />
      </Spinner>
    </div>
  )
}

export default Metar
