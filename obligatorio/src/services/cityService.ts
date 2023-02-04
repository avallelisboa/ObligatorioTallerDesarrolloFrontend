import City from "../models/entities/City";
import global from './global';

let{baseURL} = global;

function getCities(){
    fetch(`${baseURL}ciudades.php?ciudades`)
        .then(response=>console.log(response))
        .catch(error=>console.log(error));
}
function getCitiesByDepartment(departmentId:number){
    fetch(`${baseURL}ciudades.php?idDepartamento=${departmentId}`)
        .then(response=>console.log(response))
        .catch(error=>console.log(error));
}

let cityService = {
    getCities,
    getCitiesByDepartment
};
export default cityService;