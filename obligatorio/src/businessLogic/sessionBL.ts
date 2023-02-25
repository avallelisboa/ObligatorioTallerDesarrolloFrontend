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