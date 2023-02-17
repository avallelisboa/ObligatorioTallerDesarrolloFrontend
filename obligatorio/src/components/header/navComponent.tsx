import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ()=>{
    return(
        <>
            <nav>
                <ul>
                    <li><Link to="/">Movimientos</Link></li>
                    <li><Link to="/Graficas">Graficas</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;