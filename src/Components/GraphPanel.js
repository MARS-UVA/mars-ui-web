import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { heroFeedbackSubscriber } from "../ros-setup";
import HeroFeedbackPanel from './HeroFeedbackPanel';

export default function GraphPanel(){

    // State variables
    // ---------------
    // ensures that components will be redrawn when new values are received

    const [forwardLWheelCurrent, setForwardLWheelCurrent] = useState(0);
    const [rearLWheelCurrent, setRearLWheelCurrent] = useState(0);
    const [forwardRWheelCurrent, setForwardRWheelCurrent] = useState(0);
    const [rearRWheelCurrent, setRearRWheelCurrent] = useState(0);

    const [chainCurrent, setChainCurrent] = useState(0);
    const [leftActuator, setLeftActuator] = useState(0);
    const [rightActuator, setRightActuator] = useState(0);

    // Toggle data collection 
    // -----------------------

    const[dataCollection, setDataCollection] = useState(true);

    const handleDataCollectionToggle = (event) => {
        setDataCollection(event.target.checked);
        // calling a backend function here will call it asynchronously
    };

    // hook that activates on change of Data Collection State
    useEffect(()=>{
        if(dataCollection){
            heroFeedbackSubscriber.subscribe(function(message) {
                let forwardLWheelCurrent = message.forwardLWheelCurrent;
                let rearLWheelCurrent = message.rearLWheelCurrent;
                let forwardRWheelCurrent = message.forwardRWheelCurrent;
                let rearRWheelCurrent = message.rearRWheelCurrent;
            
                let chainCurrent = message.bucketLadderChainCurrent;
                let leftActuator = message.bucketLadderLeftActuator;
                let rightActuator = message.bucketLadderRightActuator;
                
               
                setForwardLWheelCurrent(forwardLWheelCurrent);
                setRearLWheelCurrent(rearLWheelCurrent);
                setForwardRWheelCurrent(forwardRWheelCurrent);
                setRearRWheelCurrent(rearRWheelCurrent);

                setChainCurrent(chainCurrent);

                setLeftActuator(leftActuator);
                setRightActuator(rightActuator);
                
            });
        }else{
            heroFeedbackSubscriber.unsubscribe()
        }
    },[dataCollection])

    // Toggle displaying the data
    // ---------------------------

    const[showData, setShowData] = useState(true);

    const handleShowDataToggle = (event) => {
        setShowData(event.target.checked);
    };

    let feedbackContent = <p></p>;
    if (showData) {
        feedbackContent = 
        <HeroFeedbackPanel 
            forwardLWheelCurrent={forwardLWheelCurrent}
            rearLWheelCurrent={rearLWheelCurrent}
            forwardRWheelCurrent={forwardRWheelCurrent}
            rearRWheelCurrent={rearRWheelCurrent}

            chainCurrent={chainCurrent}

            leftActuator={leftActuator} 
            rightActuator={rightActuator}
            >
        </HeroFeedbackPanel>;
    }

    // Build UI components
    // --------------------

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
            {feedbackContent}
        </Grid>
    </div>);
}