import User from "../models/entities/User";
import LoginUser from '../models/viewmodels/loginUserVMr';
import RegisterUser from '../models/viewmodels/registerUserVM';
import RegisterUserRequest from '../models/request/registerUserRequest';
import global from "./global";
import Department from '../models/entities/Department';

let {baseURL} = global;

function login(user:LoginUser){
    fetch(`${baseURL}login.php`,{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
          'Content-Type':'application/json'
        }  
      }).then(response=>console.log(response))
        .catch(error=>console.log(error));

}
function register(user:RegisterUserRequest){
    fetch(`${baseURL}register.php`,{
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type':'application/json'
      }  
    }).then(response=>console.log(response))
      .catch(error=>console.log(error));
}
function getUsersByDepartment(){
  fetch(`${baseURL}usuariosPorDepartamento.php`)
        .then(response=>console.log(response))
        .catch(error=>console.log(error));
}

let userService ={
    login,
    register,
    getUsersByDepartment
};
export default userService;