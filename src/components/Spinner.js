import React from 'react'

const Spinner = (props) => {
  if(props.isFetching) {
    return (
      <div>{"Fetching"}</div>
    )
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Spinner
