import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';


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


    // https://react-chartjs-2.js.org/examples/line-chart/
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map((_, i) => i+2),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map((_, i) => i*2),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return(
        <div>
            <Line options={options} data={data} />

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