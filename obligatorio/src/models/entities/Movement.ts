class Movement{
    constructor(
        public movementId:number,
        public userId:number,
        public concept:string,
        public category:number,
        public total:number,
        public paymentMethod:string,
        public date:Date,
    ){}
}

export default Movement;