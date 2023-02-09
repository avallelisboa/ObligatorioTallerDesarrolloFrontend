import Department from '../models/entities/Department';
import DepartmentVM from '../models/viewmodels/departmentVM';
import departmentService from '../services/departmentService';

function getDepartments():Array<Department>{
    let departments = departmentService.getDepartments(parseDepartments);
    return departments;
}
function getDepartmentsList():Array<DepartmentVM>{
    let departments = new Array<DepartmentVM>();
    return departments;
}
function parseDepartments(departmentsToParse:Array<object>):Array<Department>{
    let parsedDepartments:Array<Department> = departmentsToParse == null ? new Array<Department> : departmentsToParse.map(department =>{
        return new Department(0,'',0,'',0,'','',0,0,new Date(),new Date(),0,'');
    });
    return parsedDepartments;
}

let departmentBL = {
    getDepartments,
    getDepartmentsList
};

export default departmentBL;