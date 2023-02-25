import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from '../header/navComponent';
import Graphics from './graphics/graphicsComponent';
import Movements from './movements/movementsComponent';
import './dashboardComponent.scss';
import sessionBL from '../../businessLogic/sessionBL';
import Ammounts from './ammounts/ammountsComponent';

const Dashboard = (props:any)=>{

    const logOut = ()=>{
        sessionBL.logOut();
        props.setIsLoggedFN(false);
    };

    return (
    <>
        <BrowserRouter>
        <header>
            <Nav/>
            <section>
                <button onClick={logOut}>Cerrar sesión</button>
            </section>
        </header>
        <section>
            <h2>Dashboard prueba</h2>
            <Routes>
                <Route path="/" element={<Movements/>}/>
                <Route path="/*" element={<Movements/>}/>
                <Route path="/Movimientos" element={<Movements/>}/>
                <Route path="/Analisis" element={<Graphics/>}/>
                <Route path="/Montos" element={<Ammounts/>}/>
            </Routes>
        </section>
        </BrowserRouter>
    </>
    );
}

export default Dashboard;