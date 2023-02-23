import React from 'react';
import { Link } from 'react-router-dom';
import './navComponent.scss';

const Nav = ()=>{
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/Movimientos">Movimientos</Link>
                        <ul>
                            <li><Link to="/Movimientos/Agregar">Agregar Movimiento</Link></li>
                            <li><Link to="/Movimientos/Listado">Listado de Movimientos</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/Montos">Montos totales</Link></li>
                    <li>
                        <Link to="/Analisis">Análisis</Link>
                        <ul>
                            <li><Link to="/Analisis/IngresosPorRubro">Ingresos por rubro</Link></li>
                            <li><Link to="/Analisis/GastosPorRubro">Gastos por rubro</Link></li>
                            <li><Link to="/Analisis/EvolucionGasto">Evolución de gasto</Link></li>
                            <li><Link to="/Analisis/Comparativo">Comparativo</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;