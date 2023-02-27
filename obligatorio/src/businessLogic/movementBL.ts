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
import store from "../store/store";
import { addExpenses, addIncomes, addMovements as addMovementReducer, calculateDifference, sumExpense, sumIncome } from "../features/movementsSlice";
import Expense from "../models/entities/Expense";
import Income from "../models/entities/Income";

function addMovement(movementVM:AddMovementVM, callbackFN:(result:ActionResult)=>void){
    let result = isMovementValid(movementVM);
    if(result.isValid){
        let movementRequest = RequestFactoryMethod.makeAddMovementRequest(movementVM);
        MovementService.addMovement(movementRequest, callbackFN);
    }else
        callbackFN(result);
}
function getMovements(){
    MovementService.getMovements(sessionBL.getUserId(), parseMovements,(movements)=>{

        store.dispatch(addMovementReducer(JSON.stringify(movements)));
        saveIncomesAndExpensesInStore(movements);
    });    
}
function saveIncomesAndExpensesInStore(movements:Array<Movement>){
    const state = store.getState();
    let headings = JSON.parse(state.headings.headings.toString());
    
    let expenses = new Array<Expense>();
    let incomes = new Array<Income>();
    movements.forEach((element:Movement, index:number)=>{
        let heading =  headings.find((heading:any)=>heading.headingId == element.category);
        if(heading?.category == "income"){
            incomes.push(element);
        }else{
            expenses.push(element);
        }
    });
    store.dispatch(addIncomes(JSON.stringify(incomes)));
    store.dispatch(addExpenses(JSON.stringify(expenses)));
    calculateTotalsAndSaveThem(expenses,incomes,store);
}
function calculateTotalsAndSaveThem(expenses:Array<Expense>, incomes:Array<Income>,store:any){
    calculateTotalIncomeAndSaveIt(incomes, store);
    calculateTotalExpensesAndSaveIt(expenses, store);
    store.dispatch(calculateDifference());
}
function calculateTotalIncomeAndSaveIt(incomes:Array<Income>,store:any){
    incomes.forEach((element:Income)=>{
        store.dispatch(sumIncome(element.total));
    });    
}
function calculateTotalExpensesAndSaveIt(expenses:Array<Expense>,store:any){
    expenses.forEach((element:Expense)=>{
        store.dispatch(sumExpense(element.total));
    });
}
function deleteMovement(movementId:number, callbackFN:(result:ActionResult)=>void){
    MovementService.deleteMovement(movementId,callbackFN);
}
function parseMovements(movementsToParse:Array<object>):Array<Movement>{
    let movements:Array<Movement> = movementsToParse.map((movement:any) => {
        const state = store.getState();
        let headings = JSON.parse(state.headings.headings.toString());
        let heading = headings.find((element:Heading)=>element.headingId == movement.categoria);
        
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
    if(conceptLength < 4 || conceptLength > 50){
        result.isValid = false;
        result.message = "El concepto debe tener entre 4 y 50 caracteres."
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