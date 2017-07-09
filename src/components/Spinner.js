import React from 'react'

const Spinner = (props) => {
  if(props.isFetching) {
    return (
      <div>{"Fetching"}</div>
    )
  } else if (props.isFailed) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Spinner
