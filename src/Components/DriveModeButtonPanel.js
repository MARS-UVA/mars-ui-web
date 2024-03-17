import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { registerResolver } from "@grpc/grpc-js/build/src/resolver";
import { setStateClient, emergencyStopClient, motorCommandPublisher } from '../ros-setup';


function formatGamepadState(axes, buttons) {
  let rx = axes[3];
  let ry = axes[4];
  let x = axes[0];
  let y = axes[1];
  let lt = axes[2];
  let rt = axes[5];

  let b1 = 100 + buttons[3].value*100 - buttons[0].value*100; // north=200, south=0 (deposit bin angle)
  let b2 = 100 + buttons[1].value*100 - buttons[2].value*100; // east=200, west=0 (conveyor belt on/off)

  let driveForward = ry * 0.50;
  let driveTurn = rx * 0.50;
  let bucketHeight = y * -1;

  return [driveLeft(driveForward, driveTurn), // front left
          driveRight(driveForward, driveTurn), // front right
          driveLeft(driveForward, driveTurn), // back left
          driveRight(driveForward, driveTurn), // back right
          heightDirectControl(bucketHeight), // BL angle
          b1, //BL trans
          b2 //bl chain
          //DB angle
          //conveyer

        ]
}

function driveLeft(driveForward, driveTurn) {
  return driveForward - driveTurn;
}

function driveRight(driveForward, driveTurn) {
  return driveForward + driveTurn;
}

function heightDirectControl(bucketHeight) {
  return bucketHeight;
}


function arraysEqual(a, b) {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default function DriveModeButtonPanel() {

  //state for updating drive mode
  const [driveMode, setDriveMode] = useState('idle');
  const [gamepadConnectedText, setGamepadConnectedText] = useState("No gamepad connected!");
  const gamepadState = useRef(null);


  // Inspired by https://dev.to/xtrp/a-complete-guide-to-the-html5-gamepad-api-2k
  window.addEventListener("gamepadconnected", (e) => {
    console.log(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}, ${e.gamepad.axes.length} axes, ${e.gamepad.buttons.length} buttons.`);
    setGamepadConnectedText(`Gamepad connected: ${e.gamepad.id}`);
  });
  window.addEventListener("gamepaddisconnected", (e) => {
    setGamepadConnectedText("No gamepad connected!");
  });

  //onclick handler that updates state
  const handleChange = (event, newDriveMode) => {
    setDriveMode(newDriveMode);
  };

  //hook that activates on state change
  useEffect(()=>{

    const timer = setInterval(() => {
      if(driveMode !== "dd") { // TODO ideally, this interval would only run in direct drive mode, so this check wouldn't be needed
        return;
      }
      const myGamepad = navigator.getGamepads()[0]; // use the first gamepad
      console.log(myGamepad);
      if(!myGamepad) {
        return;
      }

      const newState = formatGamepadState(myGamepad.axes, myGamepad.buttons);
      if(gamepadState.current == null || !arraysEqual(newState, gamepadState.current)) {
        gamepadState.current = newState;
        var message = new ROSLIB.Message({values: [Math.floor(newState[0]), Math.floor(newState[1]), Math.floor(newState[2]), Math.floor(newState[3]), Math.floor(newState[4]), Math.floor(newState[5]), Math.floor(newState[6])] });
        motorCommandPublisher.publish(message);
        console.log("sending values to ros:", [Math.floor(newState[0]), Math.floor(newState[1]), Math.floor(newState[2]), Math.floor(newState[3]), Math.floor(newState[4]), Math.floor(newState[5]), Math.floor(newState[6])]);
      }
    }, 200);

    // var message = new ROSLIB.Message({values: [gamepadState.current[0], gamepadState.current[1], gamepadState.current[2], gamepadState.current[0], gamepadState.current[3], gamepadState.current[4], gamepadState.current[5], gamepadState.current[6] ] });
    // motorCommandPublisher.publish(message);

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
    return () => clearInterval(timer);

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
      <br/>
      <small>{gamepadConnectedText}</small>
    </div>
  );
}
