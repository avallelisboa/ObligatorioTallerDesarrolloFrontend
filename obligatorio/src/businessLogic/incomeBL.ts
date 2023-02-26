import Heading from "../models/entities/Heading";
import Income from "../models/entities/Income";
import ValidationResult from "../models/validationModels/actionResult";

function isIncomeValid(income:Income):ValidationResult{
    return new ValidationResult("", true);
}
function totalIncomeByHeadingCalculation(incomes:Array<Income>, heading:Heading){
    let totalIncome = 0;
    incomes.forEach((income)=>{
        if(heading.headingId == income.category)
            totalIncome += income.total;
    });
    return totalIncome;
}

const incomeBL ={
    isIncomeValid,
     totalIncomeByHeadingCalculation
}
export default incomeBL;