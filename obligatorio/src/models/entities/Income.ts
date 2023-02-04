import Movement from './Movement';

class Income extends Movement{
    constructor(
        movementId:number,
        userId:number,
        concept:string,
        category:number,
        total:number,
        paymentMethod:string,
        date:Date
    ){ 
        super(movementId,userId,concept,category,total,paymentMethod,date);
    }
}

export default Income;