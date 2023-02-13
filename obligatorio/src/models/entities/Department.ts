import City from './City'

class Department{
    public cities:Array<City>;
    
    constructor(
        public departmentId:number,
        public name:string,
        public countryId:number,
        public countryCode:string,
        public fipsCode:number,
        public iso2:string,
        public type:string,
        public latitude:number,
        public longitude:number,
        public createdAt:Date,
        public updatedAt:Date,
        public flag:number,
        public wikiDataId: string
    ){
        this.cities = new Array<City>();
    }
}


export default Department;