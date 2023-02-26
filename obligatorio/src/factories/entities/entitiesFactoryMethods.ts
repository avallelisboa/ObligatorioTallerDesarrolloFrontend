import Movement from '../../models/entities/Movement';
import Income from '../../models/entities/Income';
import Expense from '../../models/entities/Expense';
import Department from '../../models/entities/Department';
import City from '../../models/entities/City';
import ATM from '../../models/entities/ATM';
import Heading from '../../models/entities/Heading';
import AddMovementVM from '../../models/viewmodels/addMovementVM';

function meakeATM(atm:any):ATM{
    return new ATM(
        atm.idCajero,atm.latitud, atm.longitud,atm.depositos,
        atm.post,atm.disponible,atm.tienePesos,atm.tieneDolares
    );
}
function makeMovement(movement:any, heading:Heading):Movement{
    if(heading.category == "gasto") 
        return makeExpense(movement);
    else return makeIncome(movement);
}
function makeIncome(income:any):Income{
    return new Income(
        income.id,income.idUsuario,income.concepto,
        income.categoria,income.total, income.medio, income.fecha
    );
}
function makeExpense(expense:any):Expense{
    return new Expense(
        expense.id, expense.idUsuario, expense.concepto,
        expense.categoria, expense.total, expense.medio, expense.fecha
    );
}
function makeHeading(heading:any):Heading{
    return new Heading(heading.id,heading.nombre,heading.tipo,heading.imagen);
}
function makeDepartment(department:any):Department{
    return new Department(
        department.id,department.nombre,department.idPais,
        department.codigoPais,department.codigoFips,department.iso2,
        department.tipo,department.latitud,department.longitud,department.createdAt,
        department.updatedAt,department.bandera,department.wikiDataId
    );
}
function makeCity(city:any):City{
    return new City(
        city.id,city.nombre,city.idDepartamento,city.codigoDepartamento,city.idPais,city.codigoPais,
        city.latitud,city.longitud,city.createdAt,city.updatedAt,city.bandera,city.wikiDataId
    );
}
let entitiesFactoryMethods = {
    meakeATM,
    makeMovement,
    makeHeading,
    makeDepartment,
    makeCity
};

export default entitiesFactoryMethods;