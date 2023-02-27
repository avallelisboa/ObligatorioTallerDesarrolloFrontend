import Movement from "../models/entities/Movement";
import ValidationResult from "../models/validationModels/actionResult";
import AddMovementVM from '../models/viewmodels/addMovementVM';
import MovementService from "../services/movementService";
import RequestFactoryMethod from '../factories/request/requestFactoryMethods';
import ActionResult from "../models/validationModels/actionResult";
import entitiesFactoryMethods from "../factories/entities/entitiesFactoryMethods";
import sessionBL from "./sessionBL";
import Heading from "../models/entities/Heading";
import moment from "moment";

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
    let movements:Array<Movement> = movementsToParse.map((movement:any) => {
        let headings = localStorage.getItem("headings");
        let headingParsed = headings != null ? JSON.parse(headings) : "";
        let heading = headingParsed.find((element)=>element.id == movement.categoria);
        
        return entitiesFactoryMethods.makeMovement(movement, heading);
    });
    return movements;
}

function isMovementValid(movement:AddMovementVM):ValidationResult{
    let {idUsuario, tipo, concepto, rubro, total, medio, fecha} = movement;
    let result = new ValidationResult("", true);

    let conceptResult = isConceptValid(concepto);
    let totalResult = isTotalValid(total);
    let methodResult = isMethodValid(medio);
    let dateResult = isDateValid(fecha);

    result.isValid = conceptResult.isValid &&
                    totalResult.isValid && methodResult.isValid && dateResult.isValid;
    result.message = result.isValid ? "Los datos son válidos" :
                    conceptResult.message + " " + totalResult.message +
                    " " + methodResult.message + dateResult.message;
    result.message.trim();

    return result;
}
function isConceptValid(concept:string):ValidationResult{
    let result = new ValidationResult("", true);
    let conceptLength = concept.length;
    if(conceptLength < 4 || conceptLength > 20){
        result.isValid = false;
        result.message = "El concepto debe tener entre 4 y 20 caracteres."
    }
    return result;
}
function isTotalValid(total:number):ValidationResult{
    let result = new ValidationResult("", true);
    if(total < 0){
        result.isValid = false;
        result.message = "El total no puede ser menor a 0.";
    }
    return result;
}
function isMethodValid(method:string):ValidationResult{
    let result = new ValidationResult("", true);
    let methodLength = method.length;
    if(methodLength < 4 || methodLength > 10){
        result.isValid = false;
        result.message = "El medio debe tener entre 4 y 10 caracteres.";
    }
    return result;
}
function isDateValid(date:Date):ValidationResult{
    let result = new ValidationResult("", true);
    if(moment().isBefore(date)){
        result.isValid = false;
        result.message = "El movimiento no pudo haber sido en el futuro";
    }
    return result;
}

let MovementBL ={
    addMovement,
    getMovements,
    deleteMovement,
    isMovementValid
}

export default MovementBL;