import React from 'react'
import { Route, Routes } from 'react-router';
import GraphicIncomeByHeading from './graphicIncomeByHeading/graphicIncomeByHeadingComponent';
import GraphicsComparison from './graphicComparison/graphicsComparisonComponent';
import GraphicExpensesEvolution from './graphicExpensesEvolution/graphicExpensesEvolutionComponent';
import GraphicExpensesByHeading from './graphicExpensesByHeading/graphicExpensesByHeadingComponent';

const Graphics = () => {
  return (
    <>
      <h2>Graphics works!!!</h2>
      <Routes>
        <Route path="/Analisis/" element={<GraphicIncomeByHeading/>} />
        <Route path="/Analisis/IngresosPorRubro" element={<GraphicIncomeByHeading/>} />
        <Route path="/Analisis/GastosPorRubro" element={<GraphicExpensesByHeading/>} />
        <Route path="/Analisis/EvolucionGasto" element={<GraphicExpensesEvolution/>} />
        <Route path="/Analisis/Comparativo" element={<GraphicsComparison/>} />
      </Routes>
    </>
  );
}

export default Graphics;