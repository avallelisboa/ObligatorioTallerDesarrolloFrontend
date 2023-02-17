import AddMovementRequest from "../../models/request/addMovementRequest";
import AddMovementVM from '../../models/viewmodels/addMovementVM';
import RegisterUserRequest from "../../models/request/registerUserRequest";
import RegisterUserVM from "../../models/viewmodels/registerUserVM";
import moment from "moment";
import LoginUserVM from '../../models/viewmodels/loginUserVM';
import LoginUserRequest from '../../models/request/LoginUserRequest';

function makeAddMovementRequest(addMovementVM:AddMovementVM):AddMovementRequest{
    let date = new Date(moment('DD/MM/YYYY').toString());    
    return new AddMovementRequest(
        addMovementVM.idUsuario,addMovementVM.concepto,
        addMovementVM.total,addMovementVM.medio,date
    );
}
function makeLoginUserRequest(loginUserVM:LoginUserVM):LoginUserRequest{
    return new LoginUserRequest(loginUserVM.userName, loginUserVM.password);
}
function makeRegisterUserRequest(registerUserVM:RegisterUserVM):RegisterUserRequest{
    return new RegisterUserRequest(
        registerUserVM.userName,registerUserVM.password,
        registerUserVM.departmentId,registerUserVM.cityId
    );
}

let RequestFactoryMethod ={
    makeAddMovementRequest,
    makeLoginUserRequest,
    makeRegisterUserRequest
};
export default RequestFactoryMethod;