import City from "../models/entities/City";
import cityService from '../services/cityService';
import entitiesFactoryMethods from '../factories/entities/entitiesFactoryMethods';

function getCitiesByDepartment(departmentId:number, callbackFN:(parsedCitiesArray:any)=>void){
    cityService.getCitiesByDepartment(departmentId,parseCities, (parsedCities:Array<City>)=>{
        callbackFN(parsedCities);
    });
}
function parseCities(cities:any){
    let parsedCities:Array<City> = cities == null ? new Array<City>() :
    cities.map((city:any)=>entitiesFactoryMethods.makeCity(city));
    return parsedCities;
}

const cityBL = {
    getCitiesByDepartment
};

export default cityBL;