class AddMovementRequest{
    constructor(
        public idUsuario:number,
        public concepto:string,
        public categoria:number,
        public total:number,
        public medio:string,
        public fecha:Date
    ){}
}

export default AddMovementRequest;