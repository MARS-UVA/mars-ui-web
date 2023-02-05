import React, { useState, useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { registerResolver } from "@grpc/grpc-js/build/src/resolver";
import { setStateClient, emergencyStopClient } from '../ros-setup';

export default function DriveModeButtonPanel() {

  //state for updating drive mode
  const [driveMode, setDriveMode] = React.useState('idle');

  //onclick handler that updates state
  const handleChange = (event, newDriveMode) => {
    setDriveMode(newDriveMode);
  };

  //hook that activates on state change
  useEffect(()=>{

    var request = new ROSLIB.ServiceRequest({
      state: 0 // 0 corresponds to direct drive, 1 to autonomy, 2 to idle
    }); 
    
    if(driveMode == "dd") {
      request.state = 0;
    } else if(driveMode == "autonomy"){
      request.state = 1;
    } else if(driveMode == "idle"){
      request.state = 2;
    }

    if(driveMode != null) {
      setStateClient.callService(request, function(result) {
        console.log('Set state service called to change drive mode to ' + driveMode + '.');
      });
    }

  },[driveMode])


  function handleESTOP(){
    var request = new ROSLIB.ServiceRequest({
      stop_signal: 1 
    }); 
  
    emergencyStopClient.callService(request, function() {
      console.log('E stop service called!');
    }); 
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