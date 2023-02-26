import Heading from "../models/entities/Heading";
import headingService from "../services/headingService";
import entitiesFactoryMethods from '../factories/entities/entitiesFactoryMethods';

function getHeadings(callbackFN:(headings:Array<Heading>)=>void){
    headingService.getHeadings(parseHeadings,callbackFN);
}

function parseHeadings(headingsToParse:Array<object>):Array<Heading>{
    let parsedHeadings:Array<Heading> = headingsToParse == null? new Array<Heading> :
    headingsToParse.map(heading => entitiesFactoryMethods.makeHeading(heading));
    return parsedHeadings;
}

let headingBL={
    getHeadings,
    parseHeadings
};
export default headingBL;