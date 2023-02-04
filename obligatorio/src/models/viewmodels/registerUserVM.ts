class RegisterUserVM{
    constructor(
        public userName:string,
        public password:string,
        public verifyPassword:string,
        public departmentId:number,
        public cityId:number
    ){}
}

export default RegisterUserVM;