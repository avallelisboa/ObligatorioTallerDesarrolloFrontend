import React, {useState, useEffect} from 'react'
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import store from '../../../../store/store';
import headingSlice from '../../../../features/headingSlice';
import { useSelector } from 'react-redux';
import Heading from '../../../../models/entities/Heading';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          stepSize: 1000,
          min: 0,
          max: 9000000000
        }
      }],
      yAxes: [{
        display: true
      }],
    },
    title: {
      display: true,
      text: 'Gastos por rubro',
    },
  },
};

const GraphicExpensesByHeading = () => {
  const headings = useSelector((state:any)=>state.headings.headingsWithExpenses);
  let headingsWithExpenses:Array<Heading>;
  try{
    headingsWithExpenses = JSON.parse(headings);
  }catch(ex){
    headingsWithExpenses = new Array<Heading>();
  }
  const labels = headingsWithExpenses.map((heading:Heading)=>heading.name);
  const data ={
    labels,
    datasets:headingsWithExpenses.map((heading:Heading)=>{
      return {
          fill: true,
          label: heading.name,
          data: heading.totalExpense,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    })
  }
  if(headingsWithExpenses.length >0)
    return <Bar options={options} data={data}/>;
    else
    return <article><p>No hay datos!!!</p></article>
}

export default GraphicExpensesByHeading;