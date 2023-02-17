import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from '../header/navComponent';
import Graphics from './graphics/graphicsComponent';
import Movements from './movements/movementsComponent';

const Dashboard = ()=>{
    return (
    <>
        <BrowserRouter>
        <header>
            <Nav/>
        </header>
        <section>
            <h2>Dashboard prueba</h2>
            <Routes>
                <Route path="/" element={<Movements/>}/>
                <Route path="/Graficas" element={<Graphics/>}/>
            </Routes>
        </section>
        </BrowserRouter>
    </>
    );
}

export default Dashboard;