import './registerComponent.scss'
import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import store from '../../store/store';
import departmentsSlice from '../../features/departmentsSlice';
import { addDepartment, emptyDepartments } from '../../features/departmentsSlice';

import RegisterBL from '../../businessLogic/registerBL';
import departmentBL from '../../businessLogic/departmentsBL';

import RegisterUserVM from '../../models/viewmodels/registerUserVM';
import DepartmentEntity from '../../models/entities/Department';

import Department from './department/departmentComponent';
import City from './city/cityComponent';

const Register = ()=>{
    const [mustShowRegisterWindow, setMustShowRegisterWindow] = useState('');
    const [cities, setCities] = useState([]);
    
    const dispatch = useDispatch();
    const departments = useSelector((state:any)=> state.departmentsSlice.departments);

    useEffect(()=>{
        emptyDepartments();
        departmentBL.getDepartments((parsedDepartments:Array<DepartmentEntity>)=>{
            dispatch(addDepartment(parsedDepartments))
        });
        
    },[]);

    
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
                        {
                            departments.length > 0 ?
                            departments.map((dep:DepartmentEntity, index:number)=>`<Department key="${index}" departmentId="${dep.departmentId}" name="${dep.name}"/>`) :
                            <Department departmentId="1" name="Montevideo"/>
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="citiesInput">Ciudades</label>
                    <select name="citySelect">
                        <City cityId="1" name="Montevideo"/>
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