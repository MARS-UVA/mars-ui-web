import React, { useState, useEffect } from "react";
import '../Button.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const Change = (props, _mode) => {
  if(_mode == "dd") props.changeDD();
}

export function handleESTOP(){
  ButtonPanel.handleESTOP();
}

export default function ButtonPanel() {

  //state for updating drive mode
  const [driveMode, setDriveMode] = React.useState('idle');

  //onclick handler that updates state
  const idle = (event) => {
    setDriveMode("idle");
    driveMode = "idle";
  }

  const dd = () => {
    alert("HELLLLLLLO");
    driveMode = "dd";
    handleChange("dd");
  }

  const auto = (event) => {
    setDriveMode("auto");
  }


  const handleChange = (event, newDriveMode) => {
    setDriveMode(newDriveMode);
    console.log(newDriveMode);
    console.log("YEEEE");
  };

  //hook that activates on state change
  useEffect(()=>{
    console.log("Drive Mode: "+driveMode)
    if(driveMode == "idle"){
        console.log("idle"); //TODO: REPLACE ME WITH GRPC
    }else if(driveMode == "dd"){
        console.log("dd"); //TODO: REPLACE ME WITH GRPC
    }else if(driveMode == "autonomy"){
        console.log("auto"); //TODO: REPLACE ME WITH GRPC
    }
  },[driveMode])


  function handleESTOP(){
    console.log("STOP"); //TODO: REPLACE ME WITH GRPC
  }

  return (
    <div>
      <Change changeDD={dd} />
      <span class="b">
        <Typography variant="body2">Drive Mode:</Typography>
      </span>
      <span class="b">
        <Typography variant="body2">{driveMode}</Typography>
      </span>
      <br></br>
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
  )

}