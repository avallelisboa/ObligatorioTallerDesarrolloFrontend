import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
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
      title: {
        display: true,
        text: 'Ingresos por rubro',
      },
    },
};

const GraphicIncomeByHeading = ()=>{
    const headings = JSON.parse(useSelector((state:any)=>state.headings.headings));
    const [dataSet, setDataSet] = useState([]);
    useEffect(()=>{
        let data = headings.map((heading:Heading)=>{
            return {
                fill: true,
                label: heading.name,
                data: heading.totalIncome,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        });
        setDataSet(data);
    },[]);
    const data ={
        headings,
        datasets:dataSet
    }

    return <Bar options={options} data={data}/>;
};

export default GraphicIncomeByHeading;