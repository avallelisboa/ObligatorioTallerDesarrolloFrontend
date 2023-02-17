import entitiesFactoryMethods from "../factories/entities/entitiesFactoryMethods";
import ATM from "../models/entities/ATM";
import atmService from "../services/atmService";


function getATMs(callbackFN:(atms:Array<ATM>)=>void):void{
    atmService.getATMs(parseATMs,callbackFN);
}

function parseATMs(atmsToParse:Array<object>):Array<ATM>{
    let parsedATMs:Array<ATM> = atmsToParse == null ? new Array<ATM> :
    atmsToParse.map((atm)=> entitiesFactoryMethods.meakeATM(atm));
    return parsedATMs;
}

let atmBL ={
    getATMs
};

export default atmBL;