import React from 'react';

import { useState, useEffect } from 'react';

import './loginComponent.scss'
import Register from '../register/registerComponent'

import sessionBL from '../../businessLogic/sessionBL';
import LoginUserVM from '../../models/viewmodels/loginUserVM';
import { useDispatch } from 'react-redux';
import Department from '../../models/entities/Department';
import departmentBL from '../../businessLogic/departmentsBL';
import { addDepartment } from '../../features/departmentsSlice';
import ActionResult from '../../models/validationModels/actionResult';

const Login = ()=>{
    const [mustShowModal, setMustShownModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isThereMessage, setIsThereMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [wasThereError, setWasThereError] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        departmentBL.getDepartments((parsedDepartments:Array<Department>)=>{
            dispatch(addDepartment(JSON.stringify(parsedDepartments)));
        });
    },[]);
    useEffect(() =>{
       setMustShownModal(openModal);
    },[openModal]);

    const OpenCloseModal = ()=>{
        setOpenModal(!openModal);
    };
    const logIn = async (event:any)=>{
        event.preventDefault();
        
        setMessage('');
        setIsThereMessage(false);
        setWasThereError(false);

        let data = event.target;
        let user = data.userNameInput.value;
        let password = data.passwordInput.value;

        sessionBL.logIn(new LoginUserVM(user, password),(result:ActionResult)=>{
            setWasThereError(!(result.isValid));
            setIsThereMessage(true);
            setMessage(result.message);
        });        
    };
    return (
        <>
            <article>
                <form onSubmit={logIn}>
                    <legend>Iniciar Sesión</legend>
                    <fieldset>
                        <label htmlFor="userNameInput">Usuario</label>
                        <input type="text" name="userNameInput" id="userNameInput" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="passwordInput">Contraseña</label>
                        <input type="password" name="passwordInput" id="passwordInput"/>
                    </fieldset>
                    <fieldset>
                        <input type="submit" value="Iniciar sesión"/>
                    </fieldset>
                    <button onClick={OpenCloseModal}>Registro</button>
                </form>
                {
                    isThereMessage ?
                        <p className={wasThereError ? 'error' : 'correct'}>{message}</p> : null
                }
            </article>
            {
                mustShowModal ?
                                <article id="modalArticleId">
                                    <i className="bi bi-x-lg" onClick={OpenCloseModal}></i>
                                    <Register/>
                                </article> : 
                                null
            }
        </>
    );
}

export default Login;