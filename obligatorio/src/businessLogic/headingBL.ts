import Heading from "../models/entities/Heading";
import headingService from "../services/headingService";
import entitiesFactoryMethods from '../factories/entities/entitiesFactoryMethods';
import store from "../store/store";
import { addHeadings } from "../features/headingSlice";

function getHeadings(callbackFN:(headings:Array<Heading>)=>void){
    headingService.getHeadings(parseHeadings,(headings:Array<Heading>)=>{
        store.dispatch(addHeadings(JSON.stringify(headings)));
        callbackFN(headings);
    });
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