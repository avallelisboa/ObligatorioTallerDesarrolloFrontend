import Income from "../models/entities/Income";
import ValidationResult from "../models/validationModels/actionResult";

function isIncomeValid(income:Income):ValidationResult{
    return new ValidationResult("", true);
}

const incomeBL ={
    isIncomeValid
}
export default incomeBL;