import AddMovementRequest from "../models/request/addMovementRequest";
import sessionBL from "../businessLogic/sessionBL";
import global from "./global";
import Movement from '../models/entities/Movement';
import ActionResult from "../models/validationModels/actionResult";

let {baseURL} = global;

function addMovement(movement:AddMovementRequest, callbackFN:(result:ActionResult)=>void):void{
    let actionResult:ActionResult = new ActionResult("",false);
    let apikey = sessionBL.getApiKey();
    let bodyToSend = JSON.stringify(movement);
    fetch(`${baseURL}movimientos.php`,{
        method: 'POST',
        body: bodyToSend,
        headers:{
            'Content-Type': 'application/json',
            'apikey': `${apikey}`
        }
    }).then(response => response.json())
    .then(response => {
        console.log(response);
        if(response.status == 200)
            actionResult.isValid = true;
        actionResult.message = response.mensaje;
    })
    .catch(error => {
        console.log(error);
        actionResult.message = error;
    }).finally(()=>callbackFN(actionResult));
}
function getMovements(userId:number, parseFN:(movementsToParse:Array<object>)=>Array<Movement>, callbackFN:(movements:Array<Movement>)=>void):void{
    let movements:Array<Movement>;
    let apikey = sessionBL.getApiKey();
    fetch(`${baseURL}movimientos.php?idUsuario=${userId}`,{
        method: 'GET',
        headers: new Headers({
            'Content-Type':'application/json',
            'apikey': `${apikey}`
        })
    }).then(response => response.json())
    .then(response => {
        console.log(response);
        if(response.codigo == 200){
            movements = parseFN(response.movimientos);
            callbackFN(movements);
        }else console.log(response);
    })
    .catch(error => console.log(error));
}
function deleteMovement(movementId:number, callbackFN:(result:ActionResult)=>void):void{
    let actionResult:ActionResult = new ActionResult("", false);
    let apikey = sessionBL.getApiKey();
    fetch(`${baseURL}movimientos.php`,{
        method: 'DELETE',
        body: JSON.stringify({
            idMovimiento : movementId
        }),
        headers:{
            'Content-Type': 'application/json',
            'apikey': `${apikey}`
        }
    }).then(response => response.json())
    .then(response => {
        console.log(response);
        if(response.status == 200)
            actionResult.isValid = true;
        actionResult.message = response.mensaje;
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