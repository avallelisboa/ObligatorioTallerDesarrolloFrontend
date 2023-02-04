import './loginComponent.scss'

const Login = ()=>{
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
                    <button>Registro</button>
                </form>
            </article>
        </>
    );
}

export default Login;