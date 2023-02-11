import Movement from "../models/entities/Movement";
import ValidationResult from "../models/validationModels/actionResult";
import AddMovementVM from '../models/viewmodels/addMovementVM';
import MovementService from "../services/movementService";
import RequestFactoryMethod from '../factories/request/requestFactoryMethods';
import ActionResult from "../models/validationModels/actionResult";
import entitiesFactoryMethods from '../factories/entities/entitiesFactoryMethods';

function addMovement(movementVM:AddMovementVM):ActionResult{
    let actionResult = new ActionResult("", false);
    let {isValid,message} = isMovementValid(movementVM);
    if(isValid){
        let movementRequest = RequestFactoryMethod.makeAddMovementRequest(movementVM);
        actionResult = MovementService.addMovement(movementRequest);
    }else{
        actionResult.message = message;
    }
    
    return actionResult;
}
function getMovements(userId:number):Array<Movement>{
    let movementsJSON = MovementService.getMovements(userId);
    let movements:Array<Movement> = movementsJSON.map((movement:any) => entitiesFactoryMethods.makeMovement(movement));
    return movements;
}

function isMovementValid(movement:AddMovementVM):ValidationResult{
    return new ValidationResult("", true);
}

let MovementBL ={
    addMovement,
    isMovementValid
}

export default MovementBL;