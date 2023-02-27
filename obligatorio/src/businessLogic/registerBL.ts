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
    return isUserNameLengthCorrect(userName);
}
function isUserNameLengthCorrect(userName:string):ValidationResult{
    let validationResult = new ValidationResult("", true);
    let userNameLength = userName.length;
    if(userNameLength < 5 || userNameLength > 40){
        validationResult.isValid = false;
        validationResult.message = "El usuario debe tener entre 5 y 40 caracteres."
    }

    return validationResult;
}
function isPasswordValid(passWord:string, verifyPassword:string):ValidationResult{
    let validationResult = new ValidationResult("", true);
    
    let passwordLengthResult = isPasswordLengthCorrect(passWord);
    let passwordsMatchResult = arePasswordsTheSame(passWord, verifyPassword);

    validationResult.isValid = passwordLengthResult.isValid && passwordLengthResult.isValid;
    validationResult.message = validationResult.isValid ? "La contraseña es válida." :
                                passwordLengthResult.message + " " + passwordsMatchResult.message;
    return validationResult;
}
function isPasswordLengthCorrect(password:string):ValidationResult{
    let result = new ValidationResult("", true);
    let passworLength = password.length;
    if (passworLength < 6 || passworLength > 30){
        result.isValid = false;
        result.message = "La contraseña debe tener entre 6 y 30 caracteres.";
    }
    return result;
}
function arePasswordsTheSame(password:string, verifyPassword:string){
    let result = new ValidationResult("", true);
    if (password != verifyPassword){
        result.isValid = false;
        result.message = "La contraseñas deben coincidir.";
    }
    return result;
}

function areDepartmentAndCityCorrect(departmentId:number, cityId:number):ValidationResult{
    return new ValidationResult("", true);
}

let RegisterBL = {
    registerUser,
    isRegisterUserValid,
}

export default RegisterBL;