class AddMovementVM{
    constructor(
        public idUsuario:number,
        public tipo:string,
        public concepto:string,
        public rubro:number,
        public total:number,
        public medio:string,
        public fecha:Date
    ){}
}
export default AddMovementVM;