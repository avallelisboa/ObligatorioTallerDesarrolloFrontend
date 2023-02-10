import User from "../models/entities/User";
import LoginUser from '../models/viewmodels/loginUserVM';
import RegisterUser from '../models/viewmodels/registerUserVM';
import RegisterUserRequest from '../models/request/registerUserRequest';
import global from "./global";
import Department from '../models/entities/Department';
import ActionResult from '../models/validationModels/actionResult';

let {baseURL} = global;

function login(user:LoginUser, saveApikeyFN:(apikey:string)=>ActionResult):any{
  let actionResult:ActionResult = new ActionResult("",false);

    fetch(`${baseURL}login.php`,{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
          'Content-Type':'application/json'
        }  
      }).then(response=>{
        console.log(response);
        let apikey = JSON.parse(response.toString()).apiKey;
        actionResult = saveApikeyFN(apikey);
      })
      .catch(error=>{
        console.log(error);
        actionResult.message = JSON.parse(error).message;
      }).finally(()=>actionResult);
}
function register(user:RegisterUserRequest):any{
    let actionResult:ActionResult = new ActionResult("",false);

    fetch(`${baseURL}register.php`,{
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type':'application/json'
      }  
    }).then(response=>{
      console.log(response);
      actionResult.isValid = true;
    })
    .catch(error=>{
      console.log(error);
      actionResult.message = JSON.parse(error).message;
    }).finally(()=>actionResult);
}

let userService ={
    login,
    register
};
export default userService;