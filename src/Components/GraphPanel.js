import React, { useState, useEffect, useContext } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SocketContext } from "../SocketClientContext";

export default function GraphPanel(){

    //Variable for whether motor data collection is toggled
    const [dataCollection, setDataCollection] = useState(true);
    const [feedbackData, setFeedbackData] = useState(null);

    const socket = useContext(SocketContext);
    socket.on("StreamHeroFeedback", (data) => {
        setFeedbackData(data);
    });

    //function that changes variable of whether data collection is toggled based on checkbox input
    const handleDataCollectionToggle = (event) => {
        setDataCollection(event.target.checked);
        //DO NOT CALL GRPC FUNCTION HERE (unless you want to write async code)
    };
    //Hook that activates on change of Data Collection State
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
            console.log("enable") //TODO: REPLACE ME WITH GRPC
        }else{
            console.log("disable") //TODO: REPLACE ME WITH GRPC
        }
    },[showData])
    
    return(
    <div>
        {feedbackData != null ? 
            <code>{JSON.stringify(feedbackData, null, 2)}</code>
            : <h3>No feedback data</h3>
        }

        <br/>
        <FormControlLabel control={ <Checkbox
            checked={dataCollection}
            onChange={handleDataCollectionToggle}
            inputProps={{ 'aria-label': 'controlled' }}
        /> } label="Toggle Motor Data Collection" />
        <br/>
        <FormControlLabel control={ <Checkbox
            checked={showData}
            onChange={handleShowDataToggle}
            inputProps={{ 'aria-label': 'controlled' }}
        /> } label="Toggle Show Motor Values" />
    </div>);
}