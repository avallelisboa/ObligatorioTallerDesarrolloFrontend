import React from 'react';

import { useState, useEffect, useRef } from 'react';

import store from '../../store/store';
import { useDispatch, useSelector} from 'react-redux';

import './loginComponent.scss'
import Register from '../register/registerComponent'

import sessionBL from '../../businessLogic/sessionBL';
import LoginUserVM from '../../models/viewmodels/loginUserVM';
import Department from '../../models/entities/Department';
import departmentBL from '../../businessLogic/departmentsBL';
import { addCity, addDepartment, emptyCities, emptyDepartments } from '../../features/departmentsSlice';
import ActionResult from '../../models/validationModels/actionResult';
import cityBL from '../../businessLogic/cityBL';

const Login = (props:any)=>{
    const [mustShowModal, setMustShownModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isThereMessage, setIsThereMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [wasThereError, setWasThereError] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        departmentBL.getDepartments((parsedDepartments:Array<Department>)=>{
            store.dispatch(emptyDepartments());
            store.dispatch(addDepartment(JSON.stringify(parsedDepartments)));            
            cityBL.getCities((parsedCities)=>{
                store.dispatch(emptyCities());
                store.dispatch(addCity(JSON.stringify(parsedCities)));
            });
        });
    },[]);
    useEffect(() =>{
       setMustShownModal(openModal);
    },[openModal]);

    const OpenCloseModal = ()=>{
        setOpenModal(!openModal);
    };

    const userNameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const logIn = async (event:any)=>{
        event.preventDefault();
        
        setMessage('');
        setIsThereMessage(false);
        setWasThereError(false);

        let user = userNameInput.current?.value as string;
        let password = passwordInput.current?.value as string;
        
        sessionBL.logIn(new LoginUserVM(user, password),(result:ActionResult)=>{
            setWasThereError(!(result.isValid));
            setIsThereMessage(true);
            setMessage(result.message);
            
            if(result.isValid)
                props.setIsLoggedFN(result.isValid);
        });        
    };
    return (
        <>
            <article id='loginArticleId'>
                <form onSubmit={logIn}>
                    <legend>Iniciar Sesión</legend>
                    <fieldset>
                        <label htmlFor="userNameInput">Usuario</label>
                        <input type="text" name="userNameInput" ref={userNameInput} id="userNameInput" required/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="passwordInput">Contraseña</label>
                        <input type="password" name="passwordInput" ref={passwordInput} id="passwordInput" required/>
                    </fieldset>
                    <fieldset>
                        <input type="submit" value="Iniciar sesión"/>
                    </fieldset>
                </form>
                <div>
                    <button onClick={OpenCloseModal}>Registro</button>
                    {
                    isThereMessage ?
                        <p className={wasThereError ? 'error' : 'correct'}>{message}</p> : null
                    }
                </div>                
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