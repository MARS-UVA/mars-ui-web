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
        // console.log("Motor Data Collection Status: "+ dataCollection)
        if(dataCollection){
            // console.log("enable")
            heroFeedbackSubscriber.subscribe(function(message) {
                let heroMotorCurrents = message.currents;
                let heroDepositBinRaised = message.depositBinRaised;
                let heroDepositBinLowered = message.depositBinLowered;
                let heroLadderAngleR = message.bucketLadderAngleR;
                let heroLadderAngleL = message.bucketLadderAngleL;

                // if we need to do conversion on heroMotorCurrents, we can do that here
                // let motorCurrents = heroMotorCurrents;
                /*
                var arr = new Uint8Array(heroMotorCurrents.length-1);
                let enc = new TextEncoder("iso-8859-15");
                for(let i = 0; i < heroMotorCurrents.length-1; i++) {
                    // console.log( heroMotorCurrents.substring(i, i + 1));
                    // console.log(typeof(heroMotorCurrents.substring(i, i + 1)));
                    // console.log(heroMotorCurrents.substring(i, i + 1).charCodeAt());
                    // decodeURIComponent(escape(utfstring));
                    // let miniArray = new Uint8Array(1);
                    // miniArray[0] = 
                    let miniArr = enc.encode(heroMotorCurrents.substring(i, i + 1));
                    arr[i] = miniArr[0];
                }
                let decoder = new TextDecoder(); // "iso-8859-15"
                let motorCurrents = decoder.decode(arr); */
                let motorCurrents = heroMotorCurrents;
                // console.log("array: " + arr);
                console.log("decoded values: " + motorCurrents);
        
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
            console.log("disable")
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