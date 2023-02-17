import ATM from "../models/entities/ATM";
import global from "./global";

let {baseURL} = global;

function getATMs(parseFN:(atmsToParse:Array<object>)=>Array<ATM>,callbackFN:(atms:Array<ATM>)=>void):void{
    fetch(`${baseURL}cajeros.php`)
        .then(res => res.json())
        .then(response=>{
            console.log(response);
            
            let atms = parseFN(response);
            callbackFN(atms);
        })
        .catch(error=>{
            console.log(error);
        });
}

let atmService ={
    getATMs
};
export default atmService;