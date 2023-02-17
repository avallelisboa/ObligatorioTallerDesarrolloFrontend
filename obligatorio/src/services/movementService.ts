import AddMovementRequest from "../models/request/addMovementRequest";
import sessionBL from "../businessLogic/sessionBL";
import global from "./global";
import Movement from '../models/entities/Movement';
import ActionResult from "../models/validationModels/actionResult";

let {baseURL} = global;

function addMovement(movement:AddMovementRequest, callbackFN:(result:ActionResult)=>void):void{
    let actionResult:ActionResult = new ActionResult("",false);
    
    fetch(`${baseURL}movimientos.php`,{
        method: 'GET',
        body: JSON.stringify(movement),
        headers:{
            'Content-Type': 'application/json',
            'apikey': sessionBL.getApiKey()
        }
    }).then(response => response.json())
    .then(response => {
        console.log(response);

        if(response.status == 200)
            actionResult.isValid = true;
        actionResult.message = response.message;
    })
    .catch(error => {
        console.log(error);

        actionResult.message = error;
    }).finally(()=>callbackFN(actionResult));
}
function getMovements(userId:number, parseFN:(movementsToParse:Array<object>)=>Array<Movement>, callbackFN:(movements:Array<Movement>)=>void):void{
    let movements:Array<Movement>;
    
    fetch(`${baseURL}movimientos.php`,{
        method: 'GET',
        body: JSON.stringify(userId),
        headers:{
            'Content-Type': 'application/json',
            'apikey': sessionBL.getApiKey()
        }
    }).then(response => response.json())
    .then(response => {
        console.log(response);

        movements = parseFN(response);
        callbackFN(movements);
    })
    .catch(error => console.log(error));
}
function deleteMovement(movementId:number, callbackFN:(result:ActionResult)=>void):void{
    let actionResult:ActionResult = new ActionResult("", false);
    
    fetch(`${baseURL}movimientos.php`,{
        method: 'DELETE',
        body: JSON.stringify(movementId),
        headers:{
            'Content-Type': 'application/json',
            'apikey': sessionBL.getApiKey()
        }
    }).then(response => response.json())
    .then(response => {
        console.log(response);
        if(response.status == 200)
            actionResult.isValid = true;
        actionResult.message = response.message;
    })
    .catch(error => {
        console.log(error);
        actionResult.message = error;
    }).finally(()=>callbackFN(actionResult));
}

let MovementService = {
    addMovement,
    getMovements,
    deleteMovement
};
export default MovementService;