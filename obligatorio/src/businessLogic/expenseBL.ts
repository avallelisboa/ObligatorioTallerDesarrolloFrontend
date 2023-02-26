import Expense from "../models/entities/Expense";
import Heading from "../models/entities/Heading";
import ValidationResult from "../models/validationModels/actionResult";

function isExpenseValid(expense: Expense):ValidationResult{
    return new ValidationResult("", true);
}
function totalExpenseByHeadingCalculation(expenses:Array<Expense>, heading:Heading){
    let totalExpense = 0;
    expenses.forEach((expense)=>{
        if(heading.headingId == expense.category)
            totalExpense += expense.total;
    });
    return totalExpense;
}

const expenseBL ={
    isExpenseValid,
    totalExpenseByHeadingCalculation
}
export default expenseBL;