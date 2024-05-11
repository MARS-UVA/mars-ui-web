import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { heroFeedbackSubscriber, irSubscriber, digitalFeedbackGpioSubscriber } from "../ros-setup";
import FeedbackPanel from './FeedbackPanel';

export default function GraphPanel(){

    // State variables
    // ---------------
    // ensures that components will be redrawn when new values are received

    const [forwardLWheelCurrent, setForwardLWheelCurrent] = useState(0);
    const [rearLWheelCurrent, setRearLWheelCurrent] = useState(0);
    const [forwardRWheelCurrent, setForwardRWheelCurrent] = useState(0);
    const [rearRWheelCurrent, setRearRWheelCurrent] = useState(0);

    const [bucketLadderChainCurrent, setBucketLadderChainCurrent] = useState(0);
    const [bucketLadderActuatorCurrent, setBucketLadderActuatorCurrent] = useState(0);
    const [constructionBinActuatorCurrent, setConstructionBinActuatorCurrent] = useState(0);

    const [irReading, setIrReading] = useState(0);

    const [bucketContact, setBucketContact] = useState(false);
    const [constructionBinContact, setConstructionBinContact] = useState(false);

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
            
                let bucketLadderChainCurrent = message.bucketLadderChainCurrent;
                let bucketLadderActuatorCurrent = message.bucketLadderActuatorCurrent;
                let constructionBinActuatorCurrent = message.constructionBinActuatorCurrent;
                
               
                setForwardLWheelCurrent(forwardLWheelCurrent);
                setRearLWheelCurrent(rearLWheelCurrent);
                setForwardRWheelCurrent(forwardRWheelCurrent);
                setRearRWheelCurrent(rearRWheelCurrent);

                setBucketLadderChainCurrent(bucketLadderChainCurrent);

                setBucketLadderActuatorCurrent(bucketLadderActuatorCurrent);
                setConstructionBinActuatorCurrent(constructionBinActuatorCurrent);
                
            });

            irSubscriber.subscribe(function(message) {
                let ir_reading = message;
                    
                setIrReading(ir_reading); 
            });

            digitalFeedbackGpioSubscriber.subscribe(function(message) {
                let bucket_contact = message.bucket_contact;
                let construction_bin_contact = message.construction_bin_contact;
                    
                setBucketContact(bucket_contact); 
                setConstructionBinContact(construction_bin_contact);
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
        <FeedbackPanel 

            bucketContact={bucketContact}
            constructionBinContact={constructionBinContact}

            irReading={irReading}

            forwardLWheelCurrent={forwardLWheelCurrent}
            rearLWheelCurrent={rearLWheelCurrent}
            forwardRWheelCurrent={forwardRWheelCurrent}
            rearRWheelCurrent={rearRWheelCurrent}

            bucketLadderChainCurrent={bucketLadderChainCurrent}

            bucketLadderActuatorCurrent={bucketLadderActuatorCurrent} 
            constructionBinActuatorCurrent={constructionBinActuatorCurrent}
            >
        </FeedbackPanel>;
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