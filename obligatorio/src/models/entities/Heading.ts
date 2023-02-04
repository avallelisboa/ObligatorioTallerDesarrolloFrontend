class Heading{
    constructor(
        public headingId:number,
        public concept:string,
        public category:string,
        public method:string,
        public total:number,
        public date:Date,
        public userId:number
    ){}
}

export default Heading;