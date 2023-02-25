import './registerComponent.scss'
import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import store from '../../store/store';
import departmentsSlice from '../../features/departmentsSlice';
import { addDepartment, emptyDepartments } from '../../features/departmentsSlice';

import RegisterBL from '../../businessLogic/registerBL';
import departmentBL from '../../businessLogic/departmentsBL';
import cityBL from '../../businessLogic/cityBL';

import RegisterUserVM from '../../models/viewmodels/registerUserVM';
import DepartmentEntity from '../../models/entities/Department';
import CityEntity from '../../models/entities/City';

import Department from './department/departmentComponent';
import City from './city/cityComponent';

const Register = ()=>{
    const [mustShowRegisterWindow, setMustShowRegisterWindow] = useState('');
    const departments = JSON.parse(useSelector((state:any) => state.departments.departments));
    const cities = JSON.parse(useSelector((state:any) => state.departments.cities));
    const [selectedDepartment, setSelectedDepartment] = useState(new DepartmentEntity(0,"",0,"",0,"","",0,0,new Date(),new Date(),0,""));
    const [citiesInSelectedDepartment, setCitiesInSelectedDepartment] = useState(Array<CityEntity>);

    const updateSelectedDepartment = (event:any)=>{
        const length = departments.length;
        for(let i = 0; i < length; i++){
            if(departments[i].departmentId == event.target.value){
                setSelectedDepartment(departments[i]);
                break;
            }
        };
    };
    
    useEffect(()=>{
        setSelectedDepartment(departments[0]);
    },[]);
    useEffect(()=>{
        let citiesInDepartment:Array<CityEntity> = cities.filter((cit:any)=>cit.departmentId == selectedDepartment.departmentId);
        setCitiesInSelectedDepartment(citiesInDepartment);
    },[selectedDepartment]);
    
    const [isThereMessage, setIsThereMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [wasThereError, setWasThereError] = useState(false);

    const userNameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const verifyPasswordInput = useRef<HTMLInputElement>(null);
    const departmentIdInput = useRef<HTMLSelectElement>(null);
    const cityIdInput = useRef<HTMLSelectElement>(null);

    const submitForm = async (event:any)=>{
        event.preventDefault();

        setMessage('');
        setIsThereMessage(false);
        setWasThereError(false);

        let userName = userNameInput.current?.value as string;
        let password = passwordInput.current?.value as string;
        let verifyPassword = verifyPasswordInput.current?.value as string;
        let departmentId = parseInt(departmentIdInput.current?.value as string);
        let cityId = parseInt(cityIdInput.current?.value as string);

        let userToRegister = new RegisterUserVM(userName,password,verifyPassword,departmentId,cityId);
        RegisterBL.registerUser(userToRegister, (result)=>{
            setWasThereError(!(result.isValid));
            setIsThereMessage(true);
            setMessage(result.message);
        });      
    };

    return(
        <>
            <form onSubmit={submitForm} id="registerFormId">
                <legend>Registro</legend>
                <fieldset>
                    <label htmlFor="userInput">Usuario</label>
                    <input type="text" name="userInput" ref={userNameInput} id="userInput" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="passwordInput">Contraseña</label>
                    <input type="password" name="passwordInput" ref={passwordInput} id="passwordInput" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPasswordInput">Confirmar contraseña</label>
                    <input type="password" name="verifyPasswordInput" ref={verifyPasswordInput} id="verifyPasswordInput" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="departmentsInput">Departamentos</label>
                    <select name="departmentSelect" ref={departmentIdInput} onChange={updateSelectedDepartment} required>
                        {
                            departments.length > 0 ?
                            departments.map((dep:DepartmentEntity, index:number)=><Department key={index} departmentId={dep.departmentId} name={dep.name}/>) :
                            <Department departmentId="3218" name="Montevideo" />
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="citiesInput">Ciudades</label>
                    <select name="citySelect" ref={cityIdInput} required>
                        {
                            cities.length > 0 ?
                            citiesInSelectedDepartment.map((cit:CityEntity, index:number)=><City key={index} cityId={cit.cityId} name={cit.name}/>) :
                            <City cityId="129833" name="Montevideo"/>
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <input type="submit" value="Registrarse"/>
                </fieldset>                
            </form>
            <div id="registerMessageDiv">
                {
                    isThereMessage ?
                        <p className={wasThereError ? 'error' : 'correct'}>{message}</p> : null
                }
            </div>
        </>
    );
}

export default Register;