import ATM from "../models/entities/ATM";
import global from "./global";

let {baseURL} = global;

function getATMs(){
    fetch(`${baseURL}cajeros.php`)
        .then(response=>console.log(response))
        .catch(error=>console.log(error));
}

let atmService ={
    getATMs
};
export default atmService;