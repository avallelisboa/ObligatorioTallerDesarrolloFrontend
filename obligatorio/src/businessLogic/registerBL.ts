import RegisterUser from '../models/viewmodels/registerUserVM';
import ValidationResult from '../models/validationModels/actionResult';
import userService from '../services/userService';
import RegisterUserRequest from '../models/request/registerUserRequest';

function registerUser(userToRegister:RegisterUser):ValidationResult{
    let validationResult = isRegisterUserValid(userToRegister);
    if(validationResult.isValid){
        validationResult = userService.register(new RegisterUserRequest(userToRegister.userName,userToRegister.password,userToRegister.departmentId,userToRegister.cityId));
    }

    return validationResult;
}
function isRegisterUserValid(userToRegister:RegisterUser):ValidationResult{
    let {userName,password,verifyPassword} = userToRegister;

    return new ValidationResult("The data is valid", true);
}
function isUserNameValid(userName:string):boolean{
    return true;
}
function isPasswordValid(passWord:string):boolean{
    return true
}
let arePasswordsTheSame = (password:string, verifyPassword:string) => password == verifyPassword;

let RegisterBL = {
    registerUser,
    isRegisterUserValid,
}

export default RegisterBL;