import City from "../models/entities/City";
import global from './global';

let{baseURL} = global;

function getCities(){
    fetch(`${baseURL}ciudades.php`)
    .then(response=>response.json())
    .then(response=>console.log(response))
    .catch(error=>console.log(error));
}
function getCitiesByDepartment(departmentId:number, parseCityFN:(cities:any)=>Array<City>,callbackFN:(parsedCities:Array<City>)=>void):void{
    let cities:Array<City>;
    fetch(`${baseURL}ciudades.php?idDepartamento=${departmentId}`)
        .then(response=>response.json())
        .then(response=>{
            cities = parseCityFN(response);
            callbackFN(cities);
        })
        .catch(error=>console.log(error));
}

let cityService = {
    getCities,
    getCitiesByDepartment
};

export default cityService;