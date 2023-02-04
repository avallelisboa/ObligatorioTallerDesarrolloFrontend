import './registerComponent.scss'

import { useState, useEffect } from 'react';


const Register = ()=>{
    const [mustShowRegisterWindow, setMustShowRegisterWindow] = useState(0);
    const [departments, setDepartments] = useState(1);
    
    useEffect(()=>{

    },[])

    return(
            <form id="registerFormId">
                <legend>Registro</legend>
                <fieldset>
                    <label htmlFor="userInput">Usuario</label>
                    <input type="text" id="userInput"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="passwordInput">Contraseña</label>
                    <input type="password" id="passwordInput"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPasswordInput">Confirmar contraseña</label>
                    <input type="password" id="verifyPasswordInput"/>
                </fieldset>
                <fieldset>
                    <select></select>
                </fieldset>
                <fieldset>
                    <select></select>
                </fieldset>
                <fieldset>
                    <input type="submit" value="Registrarse"></input>
                </fieldset>
            </form>
    );
}

export default Register;