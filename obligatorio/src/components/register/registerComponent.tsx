import { useState, useEffect } from 'react';

import './registerComponents.scss'

const Register = ()=>{
    const [mustShowRegisterWindow, setMustShowRegisterWindow] = useState(0);
    const [departments, setDepartments] = useState(1);
    
    useEffect(()=>{},[])

    return(
        <div>
            <form>
                <legend>Register</legend>
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
            </form>
        </div>
    );
}

export default Register;