import Movement from "../models/entities/Movement";
import AddMovementRequest from "../models/request/addMovementRequest";
import sessionBL from "../businessLogic/sessionBL";
import global from "./global";

let {baseURL} = global;

function addMovement(movement:AddMovementRequest){
    fetch(`${baseURL}movimientos.php`,{
        method: 'GET',
        body: JSON.stringify(movement),
        headers:{
            'Content-Type': 'application/json',
            'apikey': sessionBL.getApiKey()
        }
    }).then(response => console.log(response))
      .catch(error => console.log(error));
}
function getMovements(userId:number){
    fetch(`${baseURL}movimientos.php`,{
        method: 'GET',
        body: JSON.stringify(userId),
        headers:{
            'Content-Type': 'application/json',
            'apikey': sessionBL.getApiKey()
        }
    }).then(response => console.log(response))
      .catch(error => console.log(error));
}
function deleteMovement(movementId:number){
    fetch(`${baseURL}movimientos.php`,{
        method: 'DELETE',
        body: JSON.stringify(movementId),
        headers:{
            'Content-Type': 'application/json',
            'apikey': sessionBL.getApiKey()
        }
    }).then(response => console.log(response))
      .catch(error => console.log(error));
}

let movementService = {
    addMovement,
    getMovements,
    deleteMovement
};
export default movementService;