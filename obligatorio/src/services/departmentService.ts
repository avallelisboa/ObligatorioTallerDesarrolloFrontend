import Department from '../models/entities/Department';
import global from "./global";
import sessionBL from '../businessLogic/sessionBL';
import UsersByDepartment from '../models/viewmodels/usersByDepartmentVM';

let {baseURL} = global;

function getDepartments(departmentParsingFN:(departmentsToParse:Array<object>)=>Array<Department>, callbackFN:(parsedDepartments:Array<Department>)=>void){
    let departments:Array<Department>;

    fetch(`${baseURL}departamentos.php`,{
    method: 'GET',
    headers:{
       'apikey': sessionBL.getApiKey() 
    }}).then(res => res.json())
        .then(response=>{
            console.log(response);
            departments = departmentParsingFN(response.departamentos);
            callbackFN(departments);
        })
        .catch(error=>{
            console.log(error);
        });
}

function getUsersByDepartment(usersByDepartmentParsingFN:(usersByDepartmentToParse:Array<object>)=>Array<UsersByDepartment>):any{
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
          }).finally(()=>usersByDepartment);
  }

let departmentService = {
    getDepartments,
    getUsersByDepartment
};
export default departmentService;