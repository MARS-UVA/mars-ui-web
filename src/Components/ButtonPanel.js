import React, { useContext, useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { proxyRequest } from "../proxyConnection";
import { SocketContext } from "../SocketClientContext";

function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

function formatGamepadState(axes, buttons) {
  let rx = axes[3];
  let ry = axes[4];
  let x = axes[0];
  let y = axes[1];
  let lt = axes[2];
  let rt = axes[5];

  let b1 = 100 + buttons[3].value*100 - buttons[0].value*100; // north=200, south=0 (deposit bin angle)
  let b2 = 100 + buttons[1].value*100 - buttons[2].value*100; // east=200, west=0 (conveyor belt on/off)

  // TODO: figure out a better solution for mixing the right stick. I think ideally it would involve figuring out the angle of the stick, then using sin/cos
  // to get the components, then doing some calculation based off that?
  return [clamp(Math.floor((-ry+rx) * 100 + 100), 0, 200), // right stick mixed
          clamp(Math.floor((-ry-rx) * 100 + 100), 0, 200), // right stick mixed
          Math.floor( x * 100 + 100), // left stick x axis
          Math.floor(-y * 100 + 100), // left stick y axis
          Math.floor((-(lt + 1) + (rt + 1)) * 50 + 100), // left trigger is backwards (0), right is forwards (200)
          b1, 
          b2]
}

function encodeGamepadState(left_side_motors, right_side_motors, bucket_ladder_angle, bucket_ladder_extension, bucket_ladder_chain, deposit_bin_angle, conveyor) {
  // copied exactly from Python UI file utils/protocol.py function encode_values(...)
  return [
      left_side_motors, right_side_motors, left_side_motors, right_side_motors, 
      bucket_ladder_angle, bucket_ladder_extension, bucket_ladder_chain, deposit_bin_angle, conveyor
  ];
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default function ButtonPanel() {

  const socket = useContext(SocketContext);

  //state for updating drive mode
  const [driveMode, setDriveMode] = useState("0");
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
      if(driveMode !== "0") { // TODO ideally, this interval would only run in direct drive mode, so this check wouldn't be needed
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
        socket.emit("SendDDCommand", {"values": encodeGamepadState(...newState)});
      }
    }, 100);

    return () => clearInterval(timer);
  }, [driveMode]);

  const handleChange = (event, newDriveMode) => {
    setDriveMode(newDriveMode);
    socket.emit("ChangeDriveState", {"dse": parseInt(newDriveMode)});
  };

  function handleESTOP(){
    socket.emit("EmergencyStop", {});
  }

  return (
    <div>
      <Typography>Drive Mode:</Typography>
      <ToggleButtonGroup
        value={driveMode}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton sx={{width: 110}} value="2">Idle</ToggleButton> {/* values correspond to enum in jetsonrpc.proto */}
        <ToggleButton sx={{width: 110}} value="0">DD</ToggleButton>
        <ToggleButton sx={{width: 110}} value="1">Autonomy</ToggleButton>
      </ToggleButtonGroup>

      <Button sx={{ml:5}} variant="contained" size="large" color="error" onClick={handleESTOP}>ESTOP</Button>
      <br/>
      <small>{gamepadConnectedText}</small>
    </div>
  );
}