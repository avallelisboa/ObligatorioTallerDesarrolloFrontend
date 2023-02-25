import User from "../models/entities/User";
import LoginUserRequest from "../models/request/LoginUserRequest";
import RegisterUser from '../models/viewmodels/registerUserVM';
import RegisterUserRequest from '../models/request/registerUserRequest';
import global from "./global";
import Department from '../models/entities/Department';
import ActionResult from '../models/validationModels/actionResult';

let {baseURL} = global;

function login(user:LoginUserRequest, saveApikeyFN:(apikey:string)=>ActionResult, callbackFN:(result:ActionResult)=>void):void{
  let actionResult:ActionResult = new ActionResult("",false);
    fetch(`${baseURL}login.php`,{
        method: 'POST',
        body: JSON.parse(JSON.stringify(user)),
        headers:{
          'Content-Type':'application/json'
        }  
      }).then(res => res.json())
      .then(response=>{
        console.log(response);
        if(response.codigo == 200){
          let apikey = response.apiKey;
          actionResult = saveApikeyFN(apikey);
          localStorage.setItem('userId',response.id);
        }else
          actionResult.message = response.mensaje;
      })
      .catch(error=>{
        console.log(error);
        actionResult.message = error.message;
      }).finally(()=>callbackFN(actionResult));
}
function register(user:RegisterUserRequest, callbackFN:(result:ActionResult)=>void):void{
    let actionResult:ActionResult = new ActionResult("",false);

    fetch(`${baseURL}usuarios.php`,{
      method: 'POST',
      body: JSON.parse(JSON.stringify(user)),
      headers:{
        'Content-Type':'application/json'
      }  
    }).then(res => res.json())
    .then(response=>{
      console.log(response);
      if(response.codigo == 200)
        actionResult.isValid = true;
      actionResult.message = response.mensaje;
    })
    .catch(error=>{
      console.log(error);
      actionResult.message = error.message;
    }).finally(()=>callbackFN(actionResult));
}

let userService ={
    login,
    register
};
export default userService;