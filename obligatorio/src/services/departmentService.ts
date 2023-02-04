import Department from '../models/entities/Department';
import global from "./global";
import sessionBL from '../businessLogic/sessionBL';
import UsersByDepartment from '../models/viewmodels/usersByDepartmentVM';

let {baseURL} = global;

function getDepartments(departmentParsingFN:(departmentsToParse:Array<object>)=>Array<Department>):Array<Department>{
    let departments:Array<Department> = new Array<Department>();

    fetch(`${baseURL}ciudades.php?departamentos.php`,{
    method: 'GET',
    headers:{
       'apikey': sessionBL.getApiKey() 
    }})
        .then(response=>{
            console.log(response);
            let objectToParse = JSON.parse(response.toString());
            departments = departmentParsingFN(objectToParse.departamentos);
        })
        .catch(error=>{
            console.log(error)
            let objectToParse = JSON.parse(error.toString());
            departments = departmentParsingFN(objectToParse.console.error());
        });
        
    return departments;
}

function getUsersByDepartment(usersByDepartmentParsingFN:(usersByDepartmentToParse:Array<object>)=>Array<UsersByDepartment>):Array<UsersByDepartment>{
    let usersByDepartment:Array<UsersByDepartment> = new Array<UsersByDepartment>();
  
    fetch(`${baseURL}usuariosPorDepartamento.php`)
          .then(response=>{
            console.log(response);
            let objectToParse = JSON.parse(response.toString());
            usersByDepartment = usersByDepartmentParsingFN(objectToParse);
          })
          .catch(error=>{
            console.log(error);
            let objectToParse = JSON.parse(error.toString());
            usersByDepartment = usersByDepartmentParsingFN(objectToParse);
          });
  
    return usersByDepartment;
  }

let departmentService = {
    getDepartments,
    getUsersByDepartment
};
export default departmentService;