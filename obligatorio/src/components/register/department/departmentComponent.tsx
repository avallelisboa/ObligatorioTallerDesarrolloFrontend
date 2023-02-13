import React from 'react'

const Department = (props:any) => {
  return (
    <option value={props.departmentId}>{props.name}</option>
  );
}

export default Department;