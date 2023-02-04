import Movement from "../models/entities/Movement";
import ValidationResult from "../models/validationModels/actionResult";

function isMovementValid(movement:Movement):ValidationResult{
    return new ValidationResult("", true);
}

export default isMovementValid;