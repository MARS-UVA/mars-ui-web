import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { heroFeedbackSubscriber } from "../ros-setup";

export default function GraphPanel(){

    const [angle, setAngle] = useState(30);
    const [currents, setCurrents] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
   // const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

    heroFeedbackSubscriber.subscribe(function(message) {
        let heroMotorCurrents = message.currents;
        let heroDepositBinRaised = message.depositBinRaised;
        let heroLadderAngle = message.bucketLadderAngleR;
      
        console.log('Ros setup received angle: ' 
          + heroLadderAngle + "\ncurrents: " + heroMotorCurrents 
          + "\nraised: " + heroDepositBinRaised);

        setAngle(heroLadderAngle);
        setCurrents(heroMotorCurrents);
    });

    // Variable for whether motor data collection is toggled
    const[dataCollection, setDataCollection] = useState(true);

    // function that changes variable of whether data collection is toggled based on checkbox input
    const handleDataCollectionToggle = (event) => {
        setDataCollection(event.target.checked);
        // DO NOT CALL BACKEND FUNCTION HERE (unless you want to write async code)
    };

    // Hook that activates on change of Data Collection State
    useEffect(()=>{
        console.log("Motor Data Collection Status: "+dataCollection)
        if(dataCollection){
            console.log("enable") //TODO: REPLACE ME WITH GRPC
        }else{
            console.log("disable") //TODO: REPLACE ME WITH GRPC
        }
    },[dataCollection])

    //Variable for whether motor data collection is toggled
    const[showData, setShowData] = useState(true);

    //function that changes variable of whether data collection is toggled based on checkbox input
    const handleShowDataToggle = (event) => {
        setShowData(event.target.checked);
        //DO NOT CALL GRPC FUNCTION HERE (unless you want to write async code)
    };

    //Hook that activates on change of Data Collection State
    useEffect(()=>{
        console.log("Show Motor Value Status: "+showData)
        if(showData){
            // console.log(heroFeedbackValues) 
            // motorFeedback = heroFeedbackValues;
            // currents = [2, 4, 5, 6, 7, 8, 9, 1]
        }else{
            console.log("values not shown") //TODO: REPLACE ME WITH GRPC
        }
    },[showData])

    return(
    <div>
        <Grid container>
            <FormControlLabel control={ <Checkbox
                checked={dataCollection}
                onChange={handleDataCollectionToggle}
                inputProps={{ 'aria-label': 'controlled' }}
            /> } label="Toggle Motor Data Collection" />
        </Grid>
        <Grid container>
            <FormControlLabel control={ <Checkbox
                checked={showData}
                onChange={handleShowDataToggle}
                inputProps={{ 'aria-label': 'controlled' }}
            /> } label="Toggle Show Motor Values" />
        </Grid>
        <Grid container>
            <p>Angle: {angle}</p>
            <p>Currents:{currents}</p>
        </Grid>
    </div>);
}