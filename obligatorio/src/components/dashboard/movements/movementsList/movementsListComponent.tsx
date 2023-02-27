import React,{useEffect, useState} from 'react'

import Movement from '../../../../models/entities/Movement';
import MoveElementList from './movementElementList/moveElementListComponent';

import store from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addMovements, calculateDifference, emptyMovements,
  resetDifference, resetTotalExpense, resetTotalIncome,
  sumExpense, sumIncome
} from '../../../../features/movementsSlice';

import sessionBL from '../../../../businessLogic/sessionBL';
import MovementBL from '../../../../businessLogic/movementBL';
import headingBL from '../../../../businessLogic/headingBL';
import { addHeadings, emptyHeadings } from '../../../../features/headingSlice';
import Heading from '../../../../models/entities/Heading';

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
        let storage = localStorage.getItem("headings");
        let headings = storage !=  null ? JSON.parse(storage) : new Array<Heading>();
        
        MovementBL.getMovements((movements)=>{
          store.dispatch(emptyMovements());
          store.dispatch(addMovements(JSON.stringify(movements))); 
          store.dispatch(resetDifference());
          store.dispatch(resetTotalExpense());
          store.dispatch(resetTotalIncome());

          setWasThereError(!result.isValid);
          setIsThereMessage(true);
          setMessage(result.message);

          movements.forEach((element, index)=>{
              let heading =  headings.find((heading:Heading)=>heading.headingId == element.category);
              if(heading?.category == "gasto"){
                  store.dispatch(sumIncome(element.total));
              }else{
                  store.dispatch(sumExpense(element.total));
              }
          });
        store.dispatch(calculateDifference());
      });
    });
  };

  return (
    <article>
      <h3>Movements List Component Works!!!</h3>
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
  )
}

export default MovementsList;