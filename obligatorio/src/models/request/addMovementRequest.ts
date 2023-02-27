class AddMovementRequest{
    constructor(
        public idUsuario:number,
        public concepto:string,
        public rubro:number,
        public total:number,
        public medio:string,
        public fecha:Date
    ){}
}

export default AddMovementRequest;