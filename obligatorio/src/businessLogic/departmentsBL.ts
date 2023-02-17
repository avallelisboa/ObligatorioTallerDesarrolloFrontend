import Department from '../models/entities/Department';
import DepartmentVM from '../models/viewmodels/departmentVM';
import departmentService from '../services/departmentService';
import entitiesFactoryMethods from '../factories/entities/entitiesFactoryMethods';
import cityBL from './cityBL';

function getDepartments(callbackFN:(parsedDepartments:Array<Department>)=>void){
    departmentService.getDepartments(parseDepartments,callbackFN);
    
}
function parseDepartments(departmentsToParse:Array<object>):Array<Department>{
    let parsedDepartments:Array<Department> = departmentsToParse == null ? new Array<Department> : 
    departmentsToParse.map(department =>entitiesFactoryMethods.makeDepartment(department));
    return parsedDepartments;
}

let departmentBL = {
    getDepartments
};

export default departmentBL;