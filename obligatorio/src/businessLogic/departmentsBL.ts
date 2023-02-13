import Department from '../models/entities/Department';
import DepartmentVM from '../models/viewmodels/departmentVM';
import departmentService from '../services/departmentService';
import entitiesFactoryMethods from '../factories/entities/entitiesFactoryMethods';
import cityBL from './cityBL';

function getDepartments(callbackFN:(parsedDepartments:Array<Department>)=>void){
    departmentService.getDepartments(parseDepartments, (parsedDepartments:Array<Department>)=>{
        callbackFN(parsedDepartments);
    });
    
}
function parseDepartments(departmentsToParse:Array<object>):Array<Department>{
    let parsedDepartments:Array<Department> = departmentsToParse == null ? new Array<Department> : 
    departmentsToParse.map(department =>{
        let parsedDepartment = entitiesFactoryMethods.makeDepartment(department);
        cityBL.getCitiesByDepartment(parsedDepartment.departmentId,(parsedCitiesArray)=>{
            parsedDepartment.cities = parsedCitiesArray;
        });
        return parsedDepartment;
    });
    return parsedDepartments;
}

let departmentBL = {
    getDepartments
};

export default departmentBL;