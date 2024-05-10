import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { setStateClient, emergencyStopClient, motorCommandPublisher } from '../ros-setup';
// import { raiseBinConfig, lowerBinConfig } from "../action-configs/action_configs";
// import { startActionClient } from '../ros-setup';

// let isBinLowering = false;
let isChainDirectionLocked = false;
let ladderRaisePower = 100
let blChainPower = 100;
let blChainDirection = 0;
let stepsAwayFromNeutral = 10;
let restVal = 100;
const MAX_POWER = 200;
const NEUTRAL_POWER = 100;
// const MIN_POWER = 0;
// let dumpPower = 100;
let binPower = 0;
let wheelDifferentialFactor = 1.0;

function formatGamepadState(axes, buttons) {
  //This code works with the Logitech Wireless Gamepad F710 in XInput mode with mode light off
  let controllerMin = -1;
  let controllerMax = 1;
  let motorMin = -100;
  let motorMax = 100;
  let triggMin = 100;
  let triggMax = 200;
  // let buttonInputMin = 0;
  // let buttonInputMax = 1;
  // let reverseVal = 0;

  let bucketIsForward = 1;
  let bucketPower = 100;
  binPower = 100;

  let buttonValueArray = buttons.map(button => button.value);
  //buttonValueArray = buttonValueArray.map(value => mapValue(value, buttonInputMin, buttonInputMax, motorMin, motorMax));
  let stickAxes = axes.slice(1,4).map(value => mapValue(value, controllerMax, controllerMin, motorMin, motorMax));
  let triggerAxes = axes.slice(4,6).map(value => mapValue(value, controllerMax, controllerMin, triggMin, triggMax));
  // axes = stickAxes.concat(triggerAxes);
  axes = axes.map(value => Math.pow(value, 3));
  axes = axes.map(value => mapValue(value, controllerMax, controllerMin, motorMin, motorMax));

  // let leftStickX = axes[0];
  let leftStickY = axes[1];
  let rightStickX = axes[2];
  let rightStickY = axes[3];
  let rightTrigger = axes[4];
  let leftTrigger = axes[5];


  //  btA = buttonValueArray[0];
  let btB = buttonValueArray[1];
  // let btX = buttonValueArray[2];
  let btY = buttonValueArray[3];
  let btLB = buttonValueArray[4];
  let btRB = buttonValueArray[5];
  let btLT = mapValue(buttonValueArray[6], 1, 0, 0, 100);
  let btRT = mapValue(buttonValueArray[7], 0, 1, 100, 200);
  //let leftTrigger = mapValue(buttonValueArray[6], 1, 0, 0, 100);
  //let rightTrigger = mapValue(buttonValueArray[7], 0, 1, 100, 200);
  // let back = buttonValueArray[8];
  // let start = buttonValueArray[9];
  // let leftStickClick = buttonValueArray[10];
  // let rightStickClick = buttonValueArray[11];
  let dPadUp = buttonValueArray[12];
  let dPadDown = buttonValueArray[13];
  // let dPadLeft = buttonValueArray[14];
  // let dPadRight = buttonValueArray[15];

  //mode switches 12-15 buttons and axes 0-1 between dpad and left stick, we want the mode where the light is off
  let driveForward = rightStickY;
  let driveTurn = rightStickX;
  ladderRaisePower = leftStickY + NEUTRAL_POWER;

  // processBucketRotation(btLB, btRB, leftTrigger, rightTrigger, 100);
  processBucketRotation(btLB, btRB, btLT, btRT, dPadUp, dPadDown, 100);
  processBinAngle(btY, btB);
  //processWebcamServo()

  return [driveLeft(driveForward, driveTurn, 1), // front left wheel
          driveRight(driveForward, driveTurn, 1), // front right wheel
          driveLeft(driveForward, driveTurn, wheelDifferentialFactor), // back left wheel
          driveRight(driveForward, driveTurn, wheelDifferentialFactor), // back right wheel
          ladderRaisePower,
          blChainPower,
          binPower,
          100, // webcam servo
          0 //ir servo
        ]
}

function processBinAngle(btY, btB) {
  //console.log(btY);
  //console.log(btB);
  if (btY) {
    // isBinLowering = false;
    binPower = 150;
    console.log('raising');
  }
  else if (btB) {
    // isBinLowering = true;
    binPower = 50;
    console.log('lowering');
  }
  else {
    binPower = 100;
    console.log('neutral');
  }
}

// function calculateMotorPower(restVal, forwardPower, reversePower) {
//   return (forwardPower - reversePower);
// }

function processBucketRotation(LB_val, RB_val, LT_val, RT_val, DP_up, DP_down, neutral_val) {
  
  let left_button_pressed = LB_val === 1;
  let right_button_pressed = RB_val === 1;
  // toggle on/off the "locking" of the chain speed
  if ((left_button_pressed || right_button_pressed) && !(left_button_pressed && right_button_pressed)) {
    isChainDirectionLocked = !isChainDirectionLocked;
    // console.log(isChainSpeedLocked);
  } 

  // if the chain direction is allowed to change, update it
  if(!isChainDirectionLocked) {
    // if both triggers are pressed, ignore this input
    if(LT_val !== neutral_val & RT_val === neutral_val) {
      blChainDirection = -1;
    }

    else if (LT_val === neutral_val & RT_val !== neutral_val) {
      blChainDirection = 1;
    }

    else {
      blChainDirection = 0;
    }

  }


  if(DP_up !== 0 & DP_down === 0) {
    stepsAwayFromNeutral += 5;
  }

  else if (DP_up === 0 & DP_down !== 0) {
    stepsAwayFromNeutral -= 5;
  } 

  if(stepsAwayFromNeutral < 0) {
    stepsAwayFromNeutral = 0;
  }
  
  if(stepsAwayFromNeutral > 100) {
    stepsAwayFromNeutral = 100;
  }

  blChainPower = neutral_val + blChainDirection * stepsAwayFromNeutral;
}

function driveLeft(driveForward, driveTurn, factor) {
  return Math.floor(Math.max(Math.min((restVal + (driveForward - driveTurn)*factor), MAX_POWER), 0));
}

function driveRight(driveForward, driveTurn, factor) {
  return Math.floor(Math.max(Math.min((restVal + (driveForward + driveTurn)*factor), MAX_POWER), 0));
}

function mapValue(input, inputStart, inputEnd, outputStart, outputEnd) {
  return Math.floor(outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart));
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
  const [motorCommandValues, setMotorCommandValues] = useState("No motor commands yet sent.");


  // Inspired by https://dev.to/xtrp/a-complete-guide-to-the-html5-gamepad-api-2k
  window.addEventListener("gamepadconnected", (e) => {
    //console.log(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}, ${e.gamepad.axes.length} axes, ${e.gamepad.buttons.length} buttons.`);
    setGamepadConnectedText(`Gamepad connected: ${e.gamepad.id}`);
  });
  window.addEventListener("gamepaddisconnected", (e) => {
    setGamepadConnectedText("No gamepad connected!");
  });

  //onclick handler that updates state
  const handleChange = (event, newDriveMode) => {
    // put motors in idle mode when drive state is changed
    let newCommands = [100, 100, 100, 100, 100, 100, 100];
    if(gamepadState.current == null || !arraysEqual(newCommands, gamepadState.current)) {
      var message = new ROSLIB.Message({values: newCommands });
      motorCommandPublisher.publish(message);
      console.log("sending values to ros:", newCommands);
      setMotorCommandValues(`Motor command values: ${newCommands}`);
    }
    setDriveMode(newDriveMode);
  };

  //hook that activates on state change
  useEffect(()=>{

    const timer = setInterval(() => {
      if(driveMode !== "dd") { // TODO ideally, this interval would only run in direct drive mode, so this check wouldn't be needed
        return;
      }
      const myGamepad = navigator.getGamepads()[0]; // use the first gamepad
      //console.log(myGamepad);
      if(!myGamepad) {
        return;
      }

      const newState = formatGamepadState(myGamepad.axes, myGamepad.buttons);
      if(gamepadState.current == null || !arraysEqual(newState, gamepadState.current)) {
        gamepadState.current = newState;
        var message = new ROSLIB.Message({values: [newState[0], Math.floor(newState[1]), Math.floor(newState[2]), Math.floor(newState[3]), Math.floor(newState[4]), Math.floor(newState[5]), Math.floor(newState[6])] });
        motorCommandPublisher.publish(message);
        console.log("sending values to ros:", [newState[0], Math.floor(newState[1]), Math.floor(newState[2]), Math.floor(newState[3]), Math.floor(newState[4]), Math.floor(newState[5]), Math.floor(newState[6])]);
        setMotorCommandValues(`Motor command values: ${newState}`);
      }
    }, 200);

    // var message = new ROSLIB.Message({values: [gamepadState.current[0], gamepadState.current[1], gamepadState.current[2], gamepadState.current[0], gamepadState.current[3], gamepadState.current[4], gamepadState.current[5], gamepadState.current[6] ] });
    // motorCommandPublisher.publish(message);

    var request = new ROSLIB.ServiceRequest({
      state: 0 // 0 corresponds to direct drive, 1 to autonomy, 2 to idle
    }); 
    
    if(driveMode === "dd") {
      request.state = 0;
    } else if(driveMode === "autonomy"){
      request.state = 1;
    } else if(driveMode === "idle"){
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
      <br/>
      <small>{motorCommandValues}</small>
    </div>
  );
}
