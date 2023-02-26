import ValidationResult from '../validationModels/actionResult';
import Movement from './Movement';
import expenseBL from '../../businessLogic/expenseBL';

class Expense extends Movement{
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
        return expenseBL.isExpenseValid(this);
    }
}

export default Expense;