import RegisterUser from '../models/viewmodels/registerUserVM';
import ValidationResult from '../models/validationModels/actionResult';

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

export default isRegisterUserValid;