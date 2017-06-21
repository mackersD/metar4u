import React from 'react'

const Vector = ({distance, direction}) => {
  var styles = {
    "msTransform": "rotate(" + direction + "deg)",
    "WebkitTransform": "rotate(" + direction + "deg)",
    "transform": "rotate(" + direction + "deg)",
    "display": "inline-block"
  }

  return (
    <div>
      <div style={styles}>{"^"}</div>
      <br/>
      {Math.round(distance)}
    </div>
  )
}

export default Vector
