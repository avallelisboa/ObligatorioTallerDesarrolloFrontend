import City from "../models/entities/City";
import cityService from '../services/cityService';
import entitiesFactoryMethods from '../factories/entities/entitiesFactoryMethods';
import Department from "../models/entities/Department";

function getCities(callbackFN:(parsedCitiesArray:Array<City>)=>void){
    cityService.getCities(parseCities,(parsedCities:Array<City>)=>{
        callbackFN(parsedCities);
    });
}
function getCitiesByDepartment(departmentId:number, callbackFN:(parsedCitiesArray:Array<City>)=>void){
    cityService.getCitiesByDepartment(departmentId,parseCities, (parsedCities:Array<City>)=>{
        callbackFN(parsedCities);
    });
}
function parseCities(citiesToParse:Array<object>){
    let parsedCities:Array<City> = citiesToParse == null ? new Array<City>() :
                                    citiesToParse.map((cityToParse)=>entitiesFactoryMethods.makeCity(cityToParse));
    return parsedCities;
}

const cityBL = {
    getCities,
    getCitiesByDepartment
};

export default cityBL;