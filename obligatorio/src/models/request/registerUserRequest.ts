class RegisterUserRequest{
    constructor(
        public usuario:string,
        public contraseña:string,
        public idDepartamento:number,
        public idCiudad:number
    ){}
}

export default RegisterUserRequest;