import React from 'react'

const Vector = (props) => {

  var direction = props.direction ? props.direction : 0
  var distance = props.distance ? props.distance : 0

  var arrowStyle = {
    "msTransform": "rotate(" + direction + "deg)",
    "WebkitTransform": "rotate(" + direction + "deg)",
    "transform": "rotate(" + direction + "deg)",
    "display": "inline-block"
  }

  return (
    <div className="vector">
      <div className="vectorArrow" style={arrowStyle}>{"^"}</div>
      <div className="vectorDistance">{Math.round(distance)}</div>
    </div>
  )
}

export default Vector
