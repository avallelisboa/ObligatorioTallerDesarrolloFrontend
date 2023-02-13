import Department from '../models/entities/Department';
import DepartmentVM from '../models/viewmodels/departmentVM';
import departmentService from '../services/departmentService';

function getDepartments(callbackFN:(parsedDepartments:Array<Department>)=>void){
    departmentService.getDepartments(parseDepartments, (parsedDepartments:Array<Department>)=>{
        callbackFN(parsedDepartments);
    });
    
}
function parseDepartments(departmentsToParse:Array<object>):Array<Department>{
    let parsedDepartments:Array<Department> = departmentsToParse == null ? new Array<Department> : departmentsToParse.map(department =>{
        return new Department(0,'',0,'',0,'','',0,0,new Date(),new Date(),0,'');
    });
    return parsedDepartments;
}

let departmentBL = {
    getDepartments
};

export default departmentBL;