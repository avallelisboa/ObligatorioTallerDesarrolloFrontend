import React from 'react'

const MoveElementList = (props:any) => {
  return (
    <tr>
      <td>{props.movement.movementId}</td>
      <td>{props.movement.userId}</td>
      <td>{props.movement.concept}</td>
      <td>{props.movement.category}</td>
      <td>{props.movement.total}</td>
      <td>{props.movement.paymentMethod}</td>
      <td>{props.movement.date}</td>
      <td>
        <button onClick={()=>props.deleteMovement(props.movement.movementId)}>Eliminar movimiento</button>
      </td>
    </tr>
  )
}

export default MoveElementList;