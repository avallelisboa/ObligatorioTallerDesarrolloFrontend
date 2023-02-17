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
    return new ValidationResult("Los datos son correctos", true);
}
function isUserNameValid(username:string){

}
function isPasswordValid(password:string){

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