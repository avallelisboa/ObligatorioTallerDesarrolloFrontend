import Movement from "../models/entities/Movement";
import ValidationResult from "../models/validationModels/validationResult";

function isMovementValid(movement:Movement):ValidationResult{
    return new ValidationResult("", true);
}

export default isMovementValid;