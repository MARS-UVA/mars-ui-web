import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function GraphPanel(){

    //Variable for whether motor data collection is toggled
    const[dataCollection, setDataCollection] = React.useState(true);

    //function that changes variable of whether data collection is toggled based on checkbox input
    const handleDataCollectionToggle = (event) => {
        setDataCollection(!dataCollection);
        //DO NOT DO GRPC STUFF HERE (unless you want to write async code)
    };

    //Hook that activates on change of Data Collection State
    //TODO: GRPC Call that enables data collection
    useEffect(()=>{
        console.log("Data Collection Status: "+dataCollection)
        if(dataCollection){
            console.log("enable") //REPLACE ME
        }else{
            console.log("disable") //REPLACE ME
        }
    },[dataCollection])

    return(
    <div>
        <FormControlLabel control={ <Checkbox
            checked={dataCollection}
            onChange={handleDataCollectionToggle}
            inputProps={{ 'aria-label': 'controlled' }}
        /> } label="Toggle Data Collection" />
    </div>);
}