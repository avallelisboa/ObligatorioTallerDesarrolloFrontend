import React,{useEffect, useState} from 'react'

import Movement from '../../../../models/entities/Movement';
import MoveElementList from './movementElementList/moveElementListComponent';

import store from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addMovements, emptyMovements } from '../../../../features/movementsSlice';

import sessionBL from '../../../../businessLogic/sessionBL';
import MovementBL from '../../../../businessLogic/movementBL';

const MovementsList = () => {
  const movements = JSON.parse(useSelector((state:any) => state.movements.movements));

  const [isThereMessage, setIsThereMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [wasThereError, setWasThereError] = useState(false);

  useEffect(()=>{
    let userId = sessionBL.getUserId();
    setMessage('');
    setIsThereMessage(false);
    setWasThereError(false);
  },[]);

  const dispatch = useDispatch();

  const deleteMovement = (movementId:number)=>{
    setMessage('');
    setIsThereMessage(false);
    setWasThereError(false);
    MovementBL.deleteMovement(movementId,(result)=>{      
      MovementBL.getMovements((movements)=>{
        store.dispatch(emptyMovements());
        store.dispatch(addMovements(JSON.stringify(movements)));
        setWasThereError(!result.isValid);
        setIsThereMessage(true);
        setMessage(result.message);
      });
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
        {
          isThereMessage ?
              <p className={wasThereError ? 'error' : 'correct'}>{message}</p> : null
        }
      </article>
    </>
  )
}

export default MovementsList;