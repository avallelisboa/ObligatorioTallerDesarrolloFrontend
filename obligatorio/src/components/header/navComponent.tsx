import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navComponent.scss';

const Nav = ()=>{
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/Movimientos/">Movimientos</NavLink>
                        <ul>
                            <li><NavLink to="/Movimientos/Agregar">Agregar Movimiento</NavLink></li>
                            <li><NavLink to="/Movimientos/Listado">Listado de Movimientos</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to="/Montos">Montos totales</NavLink></li>
                    <li>
                        <NavLink to="/Analisis/">Análisis</NavLink>
                        <ul>
                            <li><NavLink to="/Analisis/IngresosPorRubro">Ingresos por rubro</NavLink></li>
                            <li><NavLink to="/Analisis/GastosPorRubro">Gastos por rubro</NavLink></li>
                            <li><NavLink to="/Analisis/EvolucionGasto">Evolución de gasto</NavLink></li>
                            <li><NavLink to="/Analisis/Comparativo">Comparativo</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;