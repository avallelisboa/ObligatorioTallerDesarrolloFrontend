class City{
    constructor(
        public cityId:number,
        public name:string,
        public departmentId:number,
        public departmentCode:string,
        public countryId:string,
        public latitude:number,
        public longitude:number,
        public createdAt:Date,
        public updatedAt:Date,
        public flag:number,
        public wikiDataId:string
    ){}
}

export default City;