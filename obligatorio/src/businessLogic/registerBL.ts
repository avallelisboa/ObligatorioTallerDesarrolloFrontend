import RegisterUserVM from '../models/viewmodels/registerUserVM';
import ValidationResult from '../models/validationModels/actionResult';
import userService from '../services/userService';
import RegisterUserRequest from '../models/request/registerUserRequest';
import RequestFactoryMethod from '../factories/request/requestFactoryMethods';

function registerUser(userToRegister:RegisterUserVM):ValidationResult{
    let validationResult = isRegisterUserValid(userToRegister);
    if(validationResult.isValid){
        let user = RequestFactoryMethod.makeRegisterUserRequest(userToRegister);
        validationResult = userService.register(user);
    }

    return validationResult;
}
function isRegisterUserValid(userToRegister:RegisterUserVM):ValidationResult{
    let {userName,password,verifyPassword} = userToRegister;

    return new ValidationResult("The data is valid", true);
}
function isUserNameValid(userName:string):ValidationResult{
    return new ValidationResult("", false);
}
function isPasswordValid(passWord:string):ValidationResult{
    return new ValidationResult("", false);
}
let arePasswordsTheSame = (password:string, verifyPassword:string) => password == verifyPassword;

let RegisterBL = {
    registerUser,
    isRegisterUserValid,
}

export default RegisterBL;