import Department from '../models/entities/Department';
import global from "./global";
import sessionBL from '../businessLogic/sessionBL';

let{baseURL} = global;

function getDepartments(){
    fetch(`${baseURL}ciudades.php?departamentos.php`,{
    method: 'GET',
    headers:{
       'apikey': sessionBL.getApiKey() 
    }})
        .then(response=>console.log(response))
        .catch(error=>console.log(error));
}

let departmentService = {
    getDepartments
};
export default departmentService;