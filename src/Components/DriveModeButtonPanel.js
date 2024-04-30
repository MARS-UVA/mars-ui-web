import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { registerResolver } from "@grpc/grpc-js/build/src/resolver";
import { setStateClient, emergencyStopClient, motorCommandPublisher } from '../ros-setup';
import { raiseBinConfig, lowerBinConfig } from "../action-configs/action_configs";
import { startActionClient } from '../ros-setup';

let isBinLowering = false;
let bucketIsForward = true;
let ladderRaisePower, blChainPower = 100;
let restVal = 100;
const MAX_POWER = 200;
const NEUTRAL_POWER = 100;
const MIN_POWER = 0;
let dumpPower = 100;
let binPower = 0;

function formatGamepadState(axes, buttons) {
  //This code works with the Logitech Wireless Gamepad F710
  let controllerMin = -1;
  let controllerMax = 1;
  let motorMin = -100;
  let motorMax = 100;
  let buttonInputMin = 0;
  let buttonInputMax = 1;
  let reverseVal = 0;

  let buttonValueArray = buttons.map(button => button.value);
  axes = axes.map(value => mapValue(value, controllerMin, controllerMax, motorMin, motorMax));
  //buttonValueArray = buttonValueArray.map(value => mapValue(value, buttonInputMin, buttonInputMax, motorMin, motorMax));

  let leftStickX = axes[0];
  let leftStickY = axes[1];
  let rightStickX = axes[2];
  let rightStickY = axes[3];

  let btA = buttonValueArray[0];
  let btB = buttonValueArray[1];
  let btX = buttonValueArray[2];
  let btY = buttonValueArray[3];
  let btLB = buttonValueArray[4];
  let btRB = buttonValueArray[5];
  let btLT = buttonValueArray[6];
  let btRT = buttonValueArray[7];
  let back = buttonValueArray[8];
  let start = buttonValueArray[9];
  let leftStickClick = buttonValueArray[10];
  let rightStickClick = buttonValueArray[11];
  let dPadUp = buttonValueArray[12];
  let dPadDown = buttonValueArray[13];
  let dPadLeft = buttonValueArray[14];
  let dPadRight = buttonValueArray[15];

  //mode switches 12-15 buttons and axes 0-1 between dpad and left stick, we want the mode where the light is off

  //let ladderHeight = calculateMotorPower(restVal, btY, btB);
  //let blChainPower = calculateMotorPower(restVal, btRT, 0);

  if (btX == 100) {
    dumpPower = 200;
  } else if (btA == 100) {
    dumpPower = 0;
  }


  //checkLadderRaisePress(btY, btB);
  //checkBinRaisePress(btX, btA);

  function processBinAngle(btY, btB) {
    if (btY) {
      isBinLowering = false;
    }
    if (btB) {
      isBinLowering = true;
    }
    if (isBinLowering) {
      let request = new ROSLIB.ServiceRequest({
        action_description_json: lowerBinConfig
      });
      let json = JSON.parse(request.action_description_json)
      startActionClient.callService(request, function(result) {
        console.log('Start action service called with action: ' + json.name + '.');
      });
    }
    else {
      let request = new ROSLIB.ServiceRequest({
        action_description_json: raiseBinConfig
      });
      let json = JSON.parse(request.action_description_json)
      startActionClient.callService(request, function(result) {
        console.log('Start action service called with action: ' + json.name + '.');
      });
    } 
  }




  // let bucketHeight = calculateMotorPower(restVal, btY, btB);
  // let blChainPower = calculateMotorPower(restVal, btRT, 0);

  // let dumpPower = 100
  // if (btX == 100) {
  //   dumpPower = 200;
  // } else if (btA == 100) {
  //   dumpPower = 0;
  // }

  let driveForward = rightStickY;
  let driveTurn = rightStickX;

  processBucketRotation(btLB, btLT, btRT);
  //processLadderAngle(leftStickY);
  processBinAngle(btY, btB);
  //processWebcamServo()

  return [driveLeft(driveForward, driveTurn), // front left wheel
          driveRight(driveForward, driveTurn), // front right wheel
          driveLeft(driveForward, driveTurn), // back left wheel
          driveRight(driveForward, driveTurn), // back right wheel
          ladderRaisePower,
          blChainPower,
          binPower,
          //DB angle
          //conveyer
        ]
}

function calculateMotorPower(restVal, forwardPower, reversePower) {
  return (forwardPower - reversePower);
}

function processBucketRotation(LB_val, LT_val, RT_val) {
  if (LB_val == 1) {
    bucketIsForward = !bucketIsForward;
    blChainPower = 100;
  }
  if (bucketIsForward && LT_val == 1) {
    blChainPower = Math.min(blChainPower + 1, 200);
  }
  else if(bucketIsForward && RT_val == 1){
    blChainPower = Math.max(blChainPower - 1, 100);
  }
  else if(!bucketIsForward && LT_val == 1){
    blChainPower = Math.max(blChainPower - 1, 0);
  }
  else if(!bucketIsForward && RT_val == 1){
    blChainPower = Math.min(blChainPower + 1, 100);
  }
}

function driveLeft(driveForward, driveTurn) {
  return Math.max(Math.min(restVal + driveForward + driveTurn, MAX_POWER), 0);
}

function driveRight(driveForward, driveTurn) {
  return Math.max(Math.min(restVal + driveForward - driveTurn, MAX_POWER), 0);
}

function mapValue(input, inputStart, inputEnd, outputStart, outputEnd) {
  return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart);
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
