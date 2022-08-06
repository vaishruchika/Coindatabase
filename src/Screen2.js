import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend

);
const Screen2 = ({handleClick2, name}) => {
  const [chart, setChart]=useState([]);

  const url="https://supermind-staging.vercel.app/api/test/graph";
   const fetchData= async ()=>{
    const response = await fetch(url);
    const newData= await response.json();
    setChart(newData);
   }

  useEffect(()=>{
  fetchData();

    const timerId=setInterval(() => {
    fetchData();
    console.log('he');
  },60000)  

  return ()=> clearInterval(timerId);
  
  },[]);
  
  let data = {
    labels: chart?.map(x => x.datetime),
    datasets: [{
      label: `Price`,
      data: chart?.map(x => x.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
  

return (
    <div id="chart-container">
    <div className='chart-header'>
      <h1>
      Line Chart
      </h1>
    <button id="btn2" onClick={handleClick2}>X</button>
      </div>
      <h2 id="coinName">{name}</h2>

      <div>
      <Line
        data={data}
        height={400}
        options={options}

      />
    </div>
    </div>
  )
}

export default Screen2