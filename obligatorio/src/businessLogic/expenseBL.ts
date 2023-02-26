import Expense from "../models/entities/Expense";
import ValidationResult from "../models/validationModels/actionResult";

function isExpenseValid(expense: Expense):ValidationResult{
    return new ValidationResult("", true);
}

const expenseBL ={
    isExpenseValid
}
export default expenseBL;