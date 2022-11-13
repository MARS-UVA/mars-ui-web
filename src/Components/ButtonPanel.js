import React, { useState, useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {proxyRequest} from "../proxyConnection";

export default function ButtonPanel() {

  //state for updating drive mode
  const [driveMode, setDriveMode] = React.useState('idle');

  //onclick handler that updates state
  const handleChange = (event, newDriveMode) => {
    setDriveMode(newDriveMode);
  };

  //hook that activates on state change
  useEffect(()=>{
    console.log("Drive Mode: " + driveMode);
    let n = 0;
    if(driveMode == "idle"){
      n = 0;
    }else if(driveMode == "dd"){
      n = 1;
    }else if(driveMode == "autonomy"){
      n = 2;
    }
    proxyRequest("/ChangeDriveState", {"dse": n});
  },[driveMode])


  function handleESTOP(){
    console.log("STOP"); //TODO: REPLACE ME WITH GRPC
  }

  return (
    <div>
      <Typography variant="body2">Drive Mode:</Typography>
      <ToggleButtonGroup
        value={driveMode}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton sx={{pl:4, pr:4}} value="idle">Idle</ToggleButton>
        <ToggleButton sx={{pl:5, pr:5}} value="dd">DD</ToggleButton>
        <ToggleButton value="autonomy">Autonomy</ToggleButton>
      </ToggleButtonGroup>

      <Button sx={{ml:5}} variant="contained" size="large" color="error" onClick={()=>handleESTOP()}>ESTOP</Button>
    </div>
  );
}