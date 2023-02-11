import Movement from '../../models/entities/Movement';
import Income from '../../models/entities/Income';
import Expense from '../../models/entities/Expense';

function makeMovement(movement:any):Movement{
    if(movement.total > 0)
        return makeExpense(movement);
    else return makeIncome(movement);
}
function makeIncome(income:any):Income{
    return new Income(income.idMovimiento,income.idUsuario,income.concepto,income.categoria,income.total, income.medio, income.fecha);
}
function makeExpense(expense:any):Expense{
    return new Expense(expense.IdMovimiento, expense.idUsuario, expense.concepto, expense.categoria, expense.total, expense.medio, expense.fecha);
}
let entitiesFactoryMethods = {
    makeMovement,
    makeIncome,
    makeExpense
};

export default entitiesFactoryMethods;