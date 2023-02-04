import Expense from "../models/entities/Expense";
import ValidationResult from "../models/validationModels/validationResult";

function isExpenseValid(expense: Expense):ValidationResult{
    return new ValidationResult("", true);
}

export default isExpenseValid;