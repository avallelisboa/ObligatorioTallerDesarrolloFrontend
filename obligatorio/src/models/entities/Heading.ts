class Heading{
    public totalExpense:number;
    public totalIncome:number;
    public difference:number;
    constructor(
        public headingId:number,
        public name:string,
        public category:string,
        public image:string
    ){
        this.totalExpense = 0;
        this.totalIncome = 0;
        this.difference = 0;
    }
}

export default Heading;