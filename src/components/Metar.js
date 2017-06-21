import React from 'react'
import Vector from './Vector'
import MetarText from './MetarText'

const Metar = ({distance, direction, report, isFetching, error}) => {
  const styles = {
    display: "flex",
    "flexDirection": "row",
    "alignItems": "center"
  }
  return (
    <div style={styles}>
      <Vector
        distance={distance}
        direction={direction}
      />
      <MetarText
        text={report}
      />
    </div>
  )
}

export default Metar
