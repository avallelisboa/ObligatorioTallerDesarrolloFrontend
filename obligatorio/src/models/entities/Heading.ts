import Income from './Income';
import Expense from './Expense';
class Heading{
    public expenses:Array<Expense>;
    public incomes:Array<Income>;
    public totalExpense:number;
    public totalIncome:number;
    public difference:number;
    constructor(
        public headingId:number,
        public name:string,
        public category:string,
        public image:string
    ){
        this.incomes = new Array<Income>();
        this.expenses = new Array<Expense>();
        this.totalExpense = 0;
        this.totalIncome = 0;
        this.difference = 0;
    }
}

export default Heading;