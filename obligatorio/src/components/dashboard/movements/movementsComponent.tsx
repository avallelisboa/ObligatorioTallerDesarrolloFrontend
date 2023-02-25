import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MovementsList from './movementsList/movementsListComponent';
import AddMovement from './addMovement/addMovementComponent';

const Movements = ()=>{
    return(
    <>
        <h2> 
            Movements works!!!
        </h2>
        <Routes>
            <Route path="/Movimientos/" element={<MovementsList/>}/>
            <Route path="/Movimientos/*" element={<MovementsList/>}/>
            <Route path="/Movimientos/Listado" element={<MovementsList/>}/>
            <Route path="/Movimientos/Agregar" element={<AddMovement/>}/>
        </Routes>
    </>
    );
}

export default Movements;