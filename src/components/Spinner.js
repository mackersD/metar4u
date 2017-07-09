import React from 'react'

const Spinner = (props) => {
  if(props.isFetching) {
    return (
      <div className="spinner">{"Fetching"}</div>
    )
  } else if (props.isFailed) {
    return (null)
  }
  return (
    <div className="spinner">
      {props.children}
    </div>
  )
}

export default Spinner
