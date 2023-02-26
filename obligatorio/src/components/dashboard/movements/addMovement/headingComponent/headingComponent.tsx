import React from 'react'

const Heading = (props:any) => {
  return (
    <option value={props.headingId}>{props.headingName}</option>
  )
}

export default Heading;