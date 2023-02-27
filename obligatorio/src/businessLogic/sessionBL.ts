import LoginUserVM from '../models/viewmodels/loginUserVM';
import userService from '../services/userService';
import ValidationResult from '../models/validationModels/actionResult';
import RequestFactoryMethod from '../factories/request/requestFactoryMethods';

function logIn(user:LoginUserVM, callbackFN:(result:ValidationResult)=>void){
    let result:ValidationResult = isLoginUserValid(user);
    if(result.isValid)
        userService.login(RequestFactoryMethod.makeLoginUserRequest(user), saveApiKey, (result:ValidationResult)=>{
            callbackFN(result);
        });
}
function isLoginUserValid(user:LoginUserVM):ValidationResult{
    let result = new ValidationResult("", true);

    let userNameResult = isUserNameValid(user.userName);
    let passwordResult = isPasswordValid(user.password);

    result.isValid = userNameResult.isValid && passwordResult.isValid;
    result.message = result.isValid ? "Los datos son correctos" :
                    userNameResult.message + " " + passwordResult.message;

    return result;
}
function isUserNameValid(username:string):ValidationResult{
    let result = new ValidationResult("", true);
    if(username == null){
        result.isValid = false;
        result.message = "Debe ingresar el usuario";
    }
    return result;
}
function isPasswordValid(password:string):ValidationResult{
    let result = new ValidationResult("", true);
    if(password == null){
        result.isValid = false;
        result.message = "Debe ingresar la contraseña";
    }
    return result;
}
function isLogged():boolean{
    let apikey = localStorage.getItem('apikey');
    return apikey != 'undefined' && apikey != null;
}
function saveApiKey(apikey:string):ValidationResult{
    let validationResult = new ValidationResult("", true);
    try{
        localStorage.setItem('apikey', apikey);
    }catch(error:any){
        validationResult.isValid = false;
        validationResult.message = error.message;
    }
    return validationResult;
}
function getApiKey(){
    let apikey = localStorage.getItem('apikey');
    return apikey;
}
function getUserId():number{
    let saveUserId = localStorage.getItem('userId');
    let userId = saveUserId != null ? parseInt(saveUserId) : 0;
    return userId;
}
function logOut(){
    localStorage.clear();
}

let sessionBL = {
    logIn,
    isLoginUserValid,
    isLogged,
    saveApiKey,
    getApiKey,
    getUserId,
    logOut
};
export default sessionBL;