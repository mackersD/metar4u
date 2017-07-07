import React from 'react'

const Vector = (props) => {
  var styles = {
    "msTransform": "rotate(" + props.direction + "deg)",
    "WebkitTransform": "rotate(" + props.direction + "deg)",
    "transform": "rotate(" + props.direction + "deg)",
    "display": "inline-block"
  }

  return (
    <div>
      <div style={styles}>{"^"}</div>
      <div>{Math.round(props.distance)}</div>
    </div>
  )
}

export default Vector
