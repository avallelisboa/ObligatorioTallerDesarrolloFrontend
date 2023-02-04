import { useState, useEffect } from 'react';

import './loginComponent.scss'
import Register from '../register/registerComponent'


const Login = ()=>{
    const [mustShowModal, setMustShowModal] = useState(false);

    const ShowModal = ()=>{
        let mustShow = !mustShowModal;;
        setMustShowModal(mustShow);
    };
    return (
        <>
            <article>
                <form>
                    <legend>Iniciar Sesión</legend>
                    <fieldset>
                        <label htmlFor="userNameInnput">Usuario</label>
                        <input type="text" id="userNameInput" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="passwordInput">Contraseña</label>
                        <input type="password" id="passwordInput"/>
                    </fieldset>
                    <fieldset>
                        <input type="submit" value="Iniciar sesión"/>
                    </fieldset>
                    <button onClick={ShowModal}>Registro</button>
                </form>
                <p>{mustShowModal? 'true' : 'false'}</p>
            </article>
            {
                mustShowModal ?
                                <article id="modalArticleId">
                                    <i className="bi bi-x"></i>
                                    <Register/>
                                </article> : 
                                null
            }
        </>
    );
}

export default Login;