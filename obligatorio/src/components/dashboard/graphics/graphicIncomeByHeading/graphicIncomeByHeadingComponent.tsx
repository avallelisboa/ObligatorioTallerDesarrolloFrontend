import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    Filler,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import store from '../../../../store/store';
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
        text: 'Ingresos por rubro',
      },
    },
};

const GraphicIncomeByHeading = ()=>{
    const headings = useSelector((state:any)=>state.headings.headingsWithIncomes);
    let headingsWithIncomes:Array<Heading>;
    try{
      headingsWithIncomes = JSON.parse(headings);
    }catch(ex){
      headingsWithIncomes = new Array<Heading>();
    }
    const labels = headingsWithIncomes.map((heading)=>heading.name);
      const data ={
        labels,
        datasets:headingsWithIncomes.map((heading:Heading)=>{
          return {
              fill: true,
              label: heading.name,
              data: heading.totalIncome,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
      }),
    }
    if(headingsWithIncomes.length > 0)
      return <Bar options={options} data={data}/>;
    else
      return <article><p>No hay datos!!!</p></article>
};

export default GraphicIncomeByHeading;