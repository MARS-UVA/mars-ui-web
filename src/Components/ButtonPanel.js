import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function formatGamepadState(axes, buttons) {
  let rx = axes[3];
  let ry = axes[4];
  let x = axes[0];
  let y = axes[1];
  let lt = axes[2];
  let rt = axes[5];

  let b1 = 100 + buttons[3].value*100 - buttons[0].value*100; // north=200, south=0 (deposit bin angle)
  let b2 = 100 + buttons[1].value*100 - buttons[2].value*100; // east=200, west=0 (conveyor belt on/off)

  return [Math.floor((-ry+rx) * 100 + 100), // left stick mixed
          Math.floor((-ry-rx) * 100 + 100), // left stick mixed
          Math.floor( x * 100 + 100), // right stick x axis
          Math.floor(-y * 100 + 100), // right stick y axis
          Math.floor((-(lt + 1) + (rt + 1)) * 50 + 100), // left trigger is backwards (0), right is forwards (200)
          b1, 
          b2]
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default function ButtonPanel() {

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
  
  useEffect(() => {
    const timer = setInterval(() => {
      if(driveMode !== "dd") { // TODO ideally, this interval would only run in direct drive mode, so this check wouldn't be needed
        return;
      }
      const myGamepad = navigator.getGamepads()[0]; // use the first gamepad
      if(!myGamepad) {
        return;
      }

      const newState = formatGamepadState(myGamepad.axes, myGamepad.buttons);
      if(gamepadState.current == null || !arraysEqual(newState, gamepadState.current)) {
        gamepadState.current = newState;
        console.log("Gamepad state:", newState);
        // TODO: REPLACE ME WITH GRPC
      }
    }, 200);

    return () => clearInterval(timer);
  }, [driveMode]);

  const handleChange = (event, newDriveMode) => {
    setDriveMode(newDriveMode);
  };

  useEffect(()=>{
    console.log("Drive Mode: " + driveMode) //TODO: REPLACE ME WITH GRPC
  }, [driveMode])

  function handleESTOP(){
    console.log("ESTOP"); //TODO: REPLACE ME WITH GRPC
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

      <Button sx={{ml:5}} variant="contained" size="large" color="error" onClick={handleESTOP}>ESTOP</Button>
      <br/>
      <small>{gamepadConnectedText}</small>
    </div>
  );
}