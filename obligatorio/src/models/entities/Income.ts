import ValidationResult from '../validationModels/actionResult';
import Movement from './Movement';
import incomeBL from "../../businessLogic/incomeBL";

class Income extends Movement{
    constructor(
        movementId:number,
        userId:number,
        concept:string,
        category:number,
        total:number,
        paymentMethod:string,
        date:Date
    ){ 
        super(movementId,userId,concept,category,total,paymentMethod,date);
    }

    isValid(): ValidationResult {
        return incomeBL.isIncomeValid(this);
    }
}

export default Income;