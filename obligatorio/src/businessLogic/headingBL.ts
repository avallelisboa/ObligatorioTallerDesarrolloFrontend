import Heading from "../models/entities/Heading";
import headingService from "../services/headingService";

function getHeadings(callbackFN:(headings:Array<Heading>)=>void){
    headingService.getHeadings(parseHeadings,callbackFN);
}

function parseHeadings(headingsToParse:Array<object>):Array<Heading>{
    return new Array<Heading>();
}

let headingBL={
    getHeadings,
    parseHeadings
};
export default headingBL;