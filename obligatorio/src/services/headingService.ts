import sessionBL from "../businessLogic/sessionBL";
import Heading from "../models/entities/Heading";
import global from "./global";

let{baseURL} = global;

function getHeadings(){
    fetch(`${baseURL}rubros.php`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'apikey': sessionBL.getApiKey()
        } 
    }).then(response => console.log(response))
      .catch(error => console.log(error));
}

let headingService = {
    getHeadings
};
export default headingService;