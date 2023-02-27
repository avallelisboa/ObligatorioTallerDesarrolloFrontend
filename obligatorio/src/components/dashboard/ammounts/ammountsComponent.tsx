import React from 'react'
import store from '../../../store/store'
import { useSelector } from 'react-redux';

const Ammounts = () => {
  const totalExpense = JSON.parse(useSelector((state:any)=>state.movements.totalExpense));
  const totalIncome = JSON.parse(useSelector((state:any)=>state.movements.totalIncome));
  const difference = JSON.parse(useSelector((state:any)=>state.movements.difference));

  return (
    <article>
        <h3>Montos totales</h3>
        <p>Total ganado: {totalIncome}</p>
        <p>Total gastado: {totalExpense}</p>
        <p>Diferencia: {difference}</p>
    </article>
  )
}

export default Ammounts;