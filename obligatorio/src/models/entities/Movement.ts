class Movement{
    constructor(
        private movementId:number,
        private userId:number,
        private concept:string,
        private category:number,
        private total:number,
        private paymentMethod:string,
        private date:Date,
    ){}
}

export default Movement;