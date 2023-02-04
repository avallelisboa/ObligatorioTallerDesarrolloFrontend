import Income from "../models/entities/Income";
import ValidationResult from "../models/validationModels/actionResult";

function isIncomeValid(income:Income):ValidationResult{
    return new ValidationResult("", true);
}

export default isIncomeValid;