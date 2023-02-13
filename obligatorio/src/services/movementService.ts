import AddMovementRequest from "../models/request/addMovementRequest";
import sessionBL from "../businessLogic/sessionBL";
import global from "./global";

let {baseURL} = global;

function addMovement(movement:AddMovementRequest):any{
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
    })
    .catch(error => console.log(error));
}
function getMovements(userId:number):any{
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
    })
    .catch(error => console.log(error));
}
function deleteMovement(movementId:number):any{
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
    })
    .catch(error => console.log(error));
}

let MovementService = {
    addMovement,
    getMovements,
    deleteMovement
};
export default MovementService;