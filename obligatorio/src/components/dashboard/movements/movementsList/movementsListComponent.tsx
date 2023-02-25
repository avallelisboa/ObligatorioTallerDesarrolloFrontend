import React,{useEffect, useState} from 'react'

import Movement from '../../../../models/entities/Movement';
import MoveElementList from './movementElementList/moveElementListComponent';

import store from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovement as deleteMovementReducer } from '../../../../features/movementsSlice';

import sessionBL from '../../../../businessLogic/sessionBL';
import MovementBL from '../../../../businessLogic/movementBL';

const MovementsList = () => {
  const movements = JSON.parse(useSelector((state:any) => state.movements.movements));

  useEffect(()=>{
    let userId = sessionBL.getUserId();
  },[]);

  const dispatch = useDispatch();

  const deleteMovement = (movementId:number)=>{
    MovementBL.deleteMovement(movementId,(result)=>{
      console.log(result);
      
      store.dispatch(deleteMovementReducer(movementId));
    });
  };

  return (
    <>
      <h2>Movements List Component Works!!!</h2>
      <article>
        <table>
          <thead>
            <tr>
            <th>Id Movimiento</th>
            <th>Id Usuario</th>
            <th>Concepto</th>
            <th>Categoría</th>
            <th>Total</th>
            <th>Método de pago</th>
            <th>Fecha</th>  
            </tr>
          </thead>
          <tbody>
            {
              movements.map((movement:Movement)=><MoveElementList key={movement.movementId} movement={movement} deleteMovement={deleteMovement}/>)
            }
          </tbody>
        </table>
      </article>
    </>
  )
}

export default MovementsList;