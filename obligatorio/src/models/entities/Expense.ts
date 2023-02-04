import Movement from './Movement';

class Expense extends Movement{
    constructor(
        movementId:number,
        userId:number,
        concept:string,
        category:number,
        total:number,
        paymentMethod:string,
        date:Date
    ){
        let _total = total < 0 ? total * -1 : total;
        super(movementId,userId,concept,category,_total,paymentMethod,date);
    }
}

export default Expense;