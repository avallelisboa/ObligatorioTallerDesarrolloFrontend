class ATM{
    constructor(
        public atmId:number,
        public latitude:number,
        public longitude:number,
        public deposits:number,
        public pos:boolean,
        public available:boolean,
        public hasPesos:boolean,
        public hasDollars:boolean
    ){}
}

export default ATM;