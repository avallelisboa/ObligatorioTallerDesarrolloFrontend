import Movement from "../models/entities/Movement";
import ValidationResult from "../models/validationModels/actionResult";
import AddMovementVM from '../models/viewmodels/addMovementVM';
import MovementService from "../services/movementService";
import RequestFactoryMethod from '../factories/request/requestFactoryMethods';
import ActionResult from "../models/validationModels/actionResult";
import entitiesFactoryMethods from "../factories/entities/entitiesFactoryMethods";
import sessionBL from "./sessionBL";

function addMovement(movementVM:AddMovementVM, callbackFN:(result:ActionResult)=>void){
    let result = isMovementValid(movementVM);
    if(result.isValid){
        let movementRequest = RequestFactoryMethod.makeAddMovementRequest(movementVM);
        MovementService.addMovement(movementRequest, callbackFN);
    }else
        callbackFN(result);
}
function getMovements(callbackFN:(movements:Array<Movement>)=>void){
    MovementService.getMovements(sessionBL.getUserId(), parseMovements,callbackFN);    
}
function deleteMovement(movementId:number, callbackFN:(result:ActionResult)=>void){
    MovementService.deleteMovement(movementId,callbackFN);
}
function parseMovements(movementsToParse:Array<object>):Array<Movement>{
    let movements:Array<Movement> = movementsToParse.map((movement:any) => entitiesFactoryMethods.makeMovement(movement));
    return movements;
}

function isMovementValid(movement:AddMovementVM):ValidationResult{
    return new ValidationResult("", true);
}

let MovementBL ={
    addMovement,
    getMovements,
    deleteMovement,
    isMovementValid
}

export default MovementBL;