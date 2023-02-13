import React from 'react'

const City = (props:any) => {
  return (
    <option value={props.cityId}>{props.name}</option>
  );
}

export default City;