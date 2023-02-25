import React,{useEffect, useState} from 'react'
import MovementBL from '../../../../businessLogic/movementBL';
import sessionBL from '../../../../businessLogic/sessionBL';
import Movement from '../../../../models/entities/Movement';
import MoveElementList from './movementElementList/moveElementListComponent';

const MovementsList = () => {
  const [movements, setMovements] = useState(Array<Movement>);

  useEffect(()=>{
    let userId = sessionBL.getUserId();
    MovementBL.getMovements((movements)=>setMovements(movements));   
  },[]);

  const deleteMovement = (movementId:number)=>{
    MovementBL.deleteMovement(movementId,(result)=>{
      console.log(result);
        let _movements = movements;
        let movementsLength = _movements.length;
        for(let i = 0; i < movementsLength;i++){
          if(_movements[i].movementId == movementId){
            _movements.splice(i,1);
            break;
          }
        }
        setMovements(_movements);
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
              movements.map((movement)=> <MoveElementList key={movement.movementId} movement={movement} deleteMovement={deleteMovement}/>)
            }
          </tbody>
        </table>
      </article>
    </>
  )
}

export default MovementsList;