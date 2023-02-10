import LoginUser from '../models/viewmodels/loginUserVM';
import userService from '../services/userService';
import ValidationResult from '../models/validationModels/actionResult';

function logIn(user:LoginUser):ValidationResult{
    let result = isLoginUserValid(user);
    if(result.isValid)
        result = userService.login(user, saveApiKey);

    return result;
}
function isLoginUserValid(user:LoginUser):ValidationResult{
    return new ValidationResult("The data is correct", true);
}
function isLogged():boolean{
    return localStorage.getItem('apikey') != null;
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
function getApiKey():string{
    let apikey = localStorage.getItem('apikey');
    return apikey != null ? apikey : '';
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
    logOut
};
export default sessionBL;