import React,{useState, useRef, useEffect} from 'react'
import moment from 'moment';

import HeadingComponent from './headingComponent/headingComponent';

import sessionBL from '../../../../businessLogic/sessionBL';
import MovementBL from '../../../../businessLogic/movementBL';
import headingBL from '../../../../businessLogic/headingBL';

import Heading from '../../../../models/entities/Heading';
import AddMovementVM from '../../../../models/viewmodels/addMovementVM';

import store from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addMovements } from '../../../../features/movementsSlice';

const AddMovement = () => {
  const dispatch = useDispatch();

  const headings = JSON.parse(useSelector((state:any) => state.headings.headings));

  const movementTypeSelectRef = useRef<HTMLSelectElement>(null);
  const conceptInputRef = useRef<HTMLInputElement>(null);
  const headingSelectRef = useRef<HTMLSelectElement>(null);
  const totalInputRef = useRef<HTMLInputElement>(null);
  const methodInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [isThereMessage, setIsThereMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [wasThereError, setWasThereError] = useState(false);

  const cleanMessage = ()=>{
    setMessage('');
    setIsThereMessage(false);
    setWasThereError(false);
  };
  
  useEffect(()=>{
    cleanMessage();

    return cleanMessage();
  },[]);

  const addMovementFN = (event:any)=>{
    event.preventDefault();

    setMessage('');
    setIsThereMessage(false);
    setWasThereError(false);

    let userId:number = sessionBL.getUserId();
    let movementType:string = movementTypeSelectRef.current?.value as string;
    let concept:string = conceptInputRef.current?.value as string;
    let heading:string = headingSelectRef.current?.value as string;
    let total:number = parseInt(totalInputRef.current?.value as string);
    let method:string = methodInputRef.current?.value as string;
    let date:Date = moment(dateInputRef.current?.value as string).toDate();

    let addMovementVM:AddMovementVM = new AddMovementVM(userId, movementType,concept,heading,total,method, date);
    MovementBL.addMovement(addMovementVM, (result)=>{
      setWasThereError(!(result.isValid));
      setIsThereMessage(true);
      setMessage(result.message);
      MovementBL.getMovements((movements)=>{
        store.dispatch(addMovements(JSON.stringify(movements)));
      });
    });
  }
    return (
    <>
      <h2>Add Movement Component works!!!</h2>
      <form onSubmit={addMovementFN}>
        <legend>Agregar movimiento</legend>
        <fieldset>
          <label htmlFor="movementTypeSelectId">Tipo de movimiento</label>
          <select id="movementTypeSelectId" ref={movementTypeSelectRef}>
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="conceptInputId">Concepto</label>
          <input type="text" id="conceptInputId" ref={conceptInputRef}/>
        </fieldset>
        <fieldset>
          <label htmlFor="headingSelectId">Rubro</label>
          <select id="headingSelectId" ref={headingSelectRef}>
            {
              headings.map((heading: Heading, index:number) => <HeadingComponent key={index} headingId={heading.headingId} headingName={heading.name}/>)
            }
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="totalInputId">Total</label>
          <input type="text" id="totalInputId" ref={totalInputRef}/>
        </fieldset>
        <fieldset>
          <label htmlFor="methodInputId">Medio</label>
          <input type="text" id="methodInputId" ref={methodInputRef}/>
        </fieldset>
        <fieldset>
          <label>Fecha</label>
          <input type="date" id="dateInputId" ref={dateInputRef} />
        </fieldset>
        <fieldset>
          <input type="submit" value="Agregar"/>
        </fieldset>
        {
          isThereMessage ?
              <p className={wasThereError ? 'error' : 'correct'}>{message}</p> : null
        }
      </form>
    </>
  );
}

export default AddMovement;