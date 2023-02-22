import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props:any)=>{
    return(
        <>
            <nav>
                <ul>
                    <li><Link to="/">Movimientos</Link></li>
                    <li><Link to="/Graficas">Graficas</Link></li>
                    <li><button onClick={()=>props.setIsLoggedFN(false)}>Cerrar sesión</button></li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;