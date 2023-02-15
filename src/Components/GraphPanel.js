import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Deque from 'collections/deque';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';


function transpose(matrix) {
    // https://stackoverflow.com/a/46805290
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

export default function GraphPanel(){

    //Variable for whether motor data collection is toggled
    const [dataCollection, setDataCollection] = useState(true);

    //function that changes variable of whether data collection is toggled based on checkbox input
    const handleDataCollectionToggle = (event) => {
        setDataCollection(event.target.checked);
        //DO NOT CALL GRPC FUNCTION HERE (unless you want to write async code)
    };

    //Hook that activates on change of Data Collection State
    useEffect(() => {
        console.log("Motor Data Collection Status: " + dataCollection)
        if(dataCollection){
            console.log("enable") //TODO: REPLACE ME WITH GRPC
        }else{
            console.log("disable") //TODO: REPLACE ME WITH GRPC
        }
    }, [dataCollection])

    //Variable for whether motor data collection is toggled
    const[showData, setShowData] = useState(true);

    //function that changes variable of whether data collection is toggled based on checkbox input
    const handleShowDataToggle = (event) => {
        setShowData(event.target.checked);
        //DO NOT CALL GRPC FUNCTION HERE (unless you want to write async code)
    };

    //Hook that activates on change of Data Collection State
    useEffect(() => {
        console.log("Show Motor Value Status: " + showData)
        if(showData){
            console.log("enable") //TODO: REPLACE ME WITH GRPC
        }else{
            console.log("disable") //TODO: REPLACE ME WITH GRPC
        }
    }, [showData])

    const numDataPoints = 20;
    let chartReference = null;
    // https://www.collectionsjs.com/deque
    let graphData = new Deque( [...Array(numDataPoints)].map((_, i) => [i, i+1]) ); // fill deque with 2D array of fake data to start
    let graphDataTransposed = null;

    useEffect(() => {
        const timer = setInterval(() => {
            if(chartReference === null) {
                return;
            }

            graphData.shift();
            let nd = [Math.floor(Math.random() * 80) + 10, Math.floor(Math.random() * 25)];
            graphData.push(nd);
            graphDataTransposed = transpose(graphData.toArray()); // TODO transposing an array is expensive. Maybe it's fine in this case
                // because it happens rarely, but one way to avoid this might be to directly modify the arrays stored in chartReference.data.datasets[i]
                // instead of storing the data separately

            // https://www.chartjs.org/docs/latest/developers/updates.html
            graphDataTransposed.forEach((series, i) => {
                chartReference.data.datasets[i].data = series;
            });
            chartReference.update("none");

            // console.log(graphDataTransposed);
        }, 1500);
        return () => clearInterval(timer);
    })


    // https://react-chartjs-2.js.org/examples/line-chart/
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Legend
    );

    const options = {
        responsive: true,
        scales: {
            y:
                {
                    min: 0,
                    max: 100,
                    stepSize: 1,
                },
            x: {},
        },
    };
    const labels = [...Array(numDataPoints)].map((_, i) => ""); // set labels to empty strings but could be indices, timestamps, etc
    const data = {
        labels,
        datasets: [
            {
                label: 'Motor 1',
                // data: labels.map((_, i) => i+2),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Motor 2',
                // data: labels.map((_, i) => i*2),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return(
        <div>
            <Line options={options} data={data} ref={(ref) => chartReference = ref}/>

            <FormControlLabel control={ <Checkbox
                checked={dataCollection}
                onChange={handleDataCollectionToggle}
                inputProps={{ 'aria-label': 'controlled' }}
            /> } label="Toggle Motor Data Collection" />
            <FormControlLabel control={ <Checkbox
                checked={showData}
                onChange={handleShowDataToggle}
                inputProps={{ 'aria-label': 'controlled' }}
            /> } label="Toggle Show Motor Values" />
        </div>
    );
}