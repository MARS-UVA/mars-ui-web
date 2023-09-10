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

    const [leftAngle, setLeftAngle] = useState(30);
    const [rightAngle, setRightAngle] = useState(30);
    const [currents, setCurrents] = useState([0, 1, 2, 3, 4, 5, 6, 3, 8, 9]);
    const [binRaised, setBinRaised] = useState("false");
    const [binLowered, setBinLowered] = useState("false");

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
                let heroMotorCurrents = message.currents;
                let heroDepositBinRaised = message.depositBinRaised;
                let heroDepositBinLowered = message.depositBinLowered;
                let heroLadderAngleR = message.bucketLadderAngleR;
                let heroLadderAngleL = message.bucketLadderAngleL;
               
                let motorCurrents = heroMotorCurrents;
        
                setLeftAngle(heroLadderAngleL);
                setRightAngle(heroLadderAngleR);
                setCurrents(motorCurrents);
                if (heroDepositBinRaised) {
                    setBinRaised("true");
                } else {
                    setBinRaised("false");
                }
                if (heroDepositBinLowered) {
                    setBinLowered("true");
                } else {
                    setBinLowered("false");
                }
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
            leftAngle={leftAngle} 
            rightAngle={rightAngle}
            currents={currents} 
            binRaised={binRaised}
            binLowered={binLowered}
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