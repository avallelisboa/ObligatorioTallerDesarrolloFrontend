import './registerComponent.scss'
import { useState, useRef, useEffect } from 'react';
import RegisterBL from '../../businessLogic/registerBL';
import RegisterUserVM from '../../models/viewmodels/registerUserVM';

const Register = ()=>{
    const [mustShowRegisterWindow, setMustShowRegisterWindow] = useState('');
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    
    useEffect(()=>{
        //let departments:Array<DepartmentVM> = departmentBL.getDepartmentsList();

    });

    
    const [isThereMessage, setIsThereMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [wasThereError, setWasThereError] = useState(false);

    const submitForm = async (event:any)=>{
        event.preventDefault();

        setMessage('');
        setIsThereMessage(false);
        setWasThereError(false);
        
        let data = event.target;
        let userName = data.userInput.value;
        let password = data.passwordInput.value;
        let verifyPassword = data.verifyPasswordInput.value;
        let department = data.departmentSelect.value;
        let city = data.departmentSelect.value;

        let userToRegister = new RegisterUserVM(userName,password,verifyPassword,department, city);
        let result = await RegisterBL.registerUser(userToRegister);
        
        setWasThereError(!(result.isValid));
        setIsThereMessage(true);
        setMessage(result.message);
    };

    return(
            <form onSubmit={submitForm} id="registerFormId">
                <legend>Registro</legend>
                <fieldset>
                    <label htmlFor="userInput">Usuario</label>
                    <input type="text" name="userInput" id="userInput"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="passwordInput">Contraseña</label>
                    <input type="password" name="passwordInput" id="passwordInput"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPasswordInput">Confirmar contraseña</label>
                    <input type="password" name="verifyPasswordInput" id="verifyPasswordInput"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="departmentsInput">Departamentos</label>
                    <select name="departmentSelect">
                        <option value="1">Montevideo</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="citiesInput">Ciudades</label>
                    <select name="citySelect">
                        <option value="1">Montevideo</option>
                        <option value="2">Pajas blancas</option>
                    </select>
                </fieldset>
                <fieldset>
                    <input type="submit" value="Registrarse"/>
                </fieldset>
                {
                    isThereMessage ?
                        <p className={wasThereError ? '' : ''}>{message}</p> : null
                }
            </form>
    );
}

export default Register;