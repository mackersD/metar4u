import React from 'react'

const Metar = ({report, isFetching, error}) => {
  if(isFetching) {
    return <li>{"Fetching"}</li>
  } else if(error) {
    return <li><strong>{"ERROR: " + error}</strong></li>
  } else {
    return <li>{report}</li>
  }

}

export default Metar
