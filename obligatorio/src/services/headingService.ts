import sessionBL from "../businessLogic/sessionBL";
import Heading from "../models/entities/Heading";
import global from "./global";

let{baseURL} = global;

function getHeadings(parseFN:(headingsToParse:Array<object>)=>Array<Heading>,callbackFN:(headings:Array<Heading>)=>void):void{
    let headings:Array<Heading> = new Array<Heading>();
    fetch(`${baseURL}rubros.php`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'apikey': `${sessionBL.getApiKey()}`
        } 
    }).then((res)=>res.json())
    .then(response => {
        console.log(response);
        headings = parseFN(response.rubros);
        callbackFN(headings);
    })
    .catch(error => {
        console.log(error);
    });
}

let headingService = {
    getHeadings
};
export default headingService;