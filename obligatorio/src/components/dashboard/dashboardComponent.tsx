import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Nav from '../header/navComponent';
import Graphics from "./graphics/graphicsComponent";
import Movements from "./movements/movementsComponent";
import Ammounts from './ammounts/ammountsComponent';
import './dashboardComponent.scss';

import store from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { 
    addMovements, emptyMovements, sumIncome, sumExpense,
    resetTotalExpense, resetTotalIncome,emptyExpenses,
    emptyIncome, resetDifference, calculateDifference,
    addExpenses, addIncomes
} from '../../features/movementsSlice';
import { addHeadings, emptyHeadings } from '../../features/headingSlice';

import Heading from '../../models/entities/Heading';

import sessionBL from '../../businessLogic/sessionBL';
import MovementBL from '../../businessLogic/movementBL';
import headingBL from '../../businessLogic/headingBL';
import Expense from '../../models/entities/Expense';
import Income from '../../models/entities/Income';
import Movement from '../../models/entities/Movement';

const Dashboard = (props:any)=>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        headingBL.getHeadings((headings)=>{
            MovementBL.getMovements();
        });
        
    },[]);
    
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