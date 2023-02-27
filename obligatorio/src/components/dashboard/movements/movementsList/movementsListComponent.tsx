import React,{useEffect, useState} from 'react'

import Movement from '../../../../models/entities/Movement';
import MoveElementList from './movementElementList/moveElementListComponent';

import store from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addExpenses,
  addIncomes,
  addMovements, calculateDifference, emptyMovements,
  resetDifference, resetTotalExpense, resetTotalIncome,
  sumExpense, sumIncome
} from '../../../../features/movementsSlice';

import sessionBL from '../../../../businessLogic/sessionBL';
import MovementBL from '../../../../businessLogic/movementBL';
import headingBL from '../../../../businessLogic/headingBL';
import { addHeadings, emptyHeadings } from '../../../../features/headingSlice';
import Heading from '../../../../models/entities/Heading';
import Expense from '../../../../models/entities/Expense';
import Income from '../../../../models/entities/Income';

const MovementsList = () => {
  const movements = JSON.parse(useSelector((state:any) => state.movements.movements));
  const [expenses, setExpenses] = useState(Array<Expense>);
  const [incomes, setIncomes] = useState(Array<Income>);

  const [isThereMessage, setIsThereMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [wasThereError, setWasThereError] = useState(false);

  const [movementsOptionSelected, setMovementsOptionSelected] = useState("Todos");
  const [movementsToShow, setMovementsToShow] = useState(movements);

  useEffect(()=>{
    let userId = sessionBL.getUserId();
    setMessage('');
    setIsThereMessage(false);
    setWasThereError(false);

    let storage = localStorage.getItem("headings");
    let headings:Array<Heading> = storage != null ? JSON.parse(storage) : new Array<Heading>();
    
    let expenses = new Array<Expense>();
    let incomes = new Array<Income>();
    movements.forEach((element:Movement, index:number)=>{
        let heading =  headings.find((heading:Heading)=>heading.headingId == element.category);
        if(heading?.category == "gasto"){
          expenses.push(element);
        }else{
          incomes.push(element);
        }
    });
    setIncomes(incomes);
    setExpenses(expenses);
  },[]);

  useEffect(()=>{
    switch(movementsOptionSelected){
      case "Todos":
      default:
        setMovementsToShow(movements);
        break;
      case "Ingresos":
        setMovementsToShow(incomes);
        break;
      case "Gastos":
        setMovementsToShow(expenses);
        break;
    }
  },[movementsOptionSelected]);

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
          store.dispatch(calculateDifference());
      });
    });
  };

  return (
    <article>
      <h3>Lista de movimientos</h3>
      <select onChange={(e)=>setMovementsOptionSelected(e.target.value)}>
        <option value="Todos">Todos</option>
        <option value="Gastos">Gastos</option>
        <option value="Ingresos">Ingresos</option>
      </select>
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
              movementsToShow.map((movement:Movement)=><MoveElementList key={movement.movementId} movement={movement} deleteMovement={deleteMovement}/>)
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