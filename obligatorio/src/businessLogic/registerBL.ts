import RegisterUserVM from '../models/viewmodels/registerUserVM';
import ValidationResult from '../models/validationModels/actionResult';
import userService from '../services/userService';
import RegisterUserRequest from '../models/request/registerUserRequest';
import RequestFactoryMethod from '../factories/request/requestFactoryMethods';

function registerUser(userToRegister:RegisterUserVM,callbackFN:(result:ValidationResult)=>void){
    let validationResult = isRegisterUserValid(userToRegister);
    if(validationResult.isValid){
        let user = RequestFactoryMethod.makeRegisterUserRequest(userToRegister);
        userService.register(user,(result)=>{
            callbackFN(result);
        });
    }else callbackFN(validationResult);
}
function isRegisterUserValid(userToRegister:RegisterUserVM):ValidationResult{
    let {userName,password,verifyPassword,departmentId,cityId} = userToRegister;
    let validationResult = new ValidationResult("", false);
    
    let userNameResult = isUserNameValid(userName);
    let passwordResult = isPasswordValid(password, verifyPassword);
    let areDepartmentsAndCityCorrectResult = areDepartmentAndCityCorrect(departmentId, cityId);

    validationResult.isValid = userNameResult.isValid && passwordResult.isValid && areDepartmentsAndCityCorrectResult.isValid;
    validationResult.message = validationResult.isValid ? "Los datos son válidos" :
                                userNameResult.message + " " + passwordResult.message + " " + areDepartmentsAndCityCorrectResult.message;
    validationResult.message = validationResult.message.trim();

    return validationResult;
}
function isUserNameValid(userName:string):ValidationResult{
    return new ValidationResult("", true);
}
function isUserNameLengthCorrect(userName:string):ValidationResult{
    return new ValidationResult("", true);
}
function isPasswordValid(passWord:string, verifyPassword:string):ValidationResult{
    return new ValidationResult("", true);
}
function isPasswordLengthCorrect(password:string):ValidationResult{
    return new ValidationResult("", true);
}
const arePasswordsTheSame = (password:string, verifyPassword:string) => password == verifyPassword;

function areDepartmentAndCityCorrect(departmentId:number, cityId:number):ValidationResult{
    return new ValidationResult("", true);
}

let RegisterBL = {
    registerUser,
    isRegisterUserValid,
}

export default RegisterBL;