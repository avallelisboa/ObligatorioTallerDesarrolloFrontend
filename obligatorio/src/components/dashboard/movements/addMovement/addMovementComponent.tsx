import React,{useState, useRef} from 'react'
import sessionBL from '../../../../businessLogic/sessionBL';
import AddMovementVM from '../../../../models/viewmodels/addMovementVM';
import MovementBL from '../../../../businessLogic/movementBL';

const AddMovement = () => {

  const conceptInputRef = useRef<HTMLInputElement>(null);
  const totalInputRef = useRef<HTMLInputElement>(null);
  const methodInputRef = useRef<HTMLInputElement>(null);

  const [isThereMessage, setIsThereMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [wasThereError, setWasThereError] = useState(false);

  const addMovementFN = (event:any)=>{
    event.preventDefault();

    setMessage('');
    setIsThereMessage(false);
    setWasThereError(false);

    let userId:number = sessionBL.getUserId();
    let concept:string = conceptInputRef.current?.value as string;
    let total:number = parseInt(totalInputRef.current?.value as string);
    let method:string = methodInputRef.current?.value as string;

    let addMovementVM:AddMovementVM = new AddMovementVM(userId,concept,total,method);
    MovementBL.addMovement(addMovementVM, (result)=>{
      setWasThereError(!(result.isValid));
      setIsThereMessage(true);
      setMessage(result.message);
    });
  }
    return (
    <>
      <h2>Add Movement Component works!!!</h2>
      <form onSubmit={addMovementFN}>
        <legend>Agregar movimiento</legend>
        <fieldset>
          <label htmlFor="conceptInputId">Concepto</label>
          <input type="text" id="conceptInputId" ref={conceptInputRef}/>
        </fieldset>
        <fieldset>
          <label htmlFor="totalInputRef">Total</label>
          <input type="text" id="totalInputRef" ref={totalInputRef}/>
        </fieldset>
        <fieldset>
          <label htmlFor="methodInputRef">Medio</label>
          <input type="text" id="methodInputRef" ref={methodInputRef}/>
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