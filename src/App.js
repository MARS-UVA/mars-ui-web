import React, { useEffect, useRef, useState } from 'react';
import { useGamepads } from 'react-gamepads';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TabContainer from './Components/TabContainer'
import CameraPane from './Components/CameraPane.js'
import ButtonPanel from './Components/ButtonPanel';
import { socket, SocketContext } from "./SocketClientContext.js";

export default function App() {

  const [gamepads, setGamepads] = useState({});
  useGamepads(gamepads => setGamepads(gamepads));

  var message1 = 'nothing is pressed';
  var message2 = 'Axis';
  gamepads[0].buttons.forEach((button, i) => {
    if (button.pressed) {
      // console.log("Button " + i + " is pressed");
      message1 = "Button " + i + " is pressed";
    }
  });

  gamepads[0].axes.forEach((axis, i) => {
    message2 = "Axis " + i + ": " + axis;
  });

  let val = useRef(1);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("interval i=", val.current);
      val.current = val.current + 1;
      socket.emit("SendDDCommand", {"values": [1, 2, val.current]});
    }, 2000);
    return () => clearInterval(timer);
  });

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Typography variant="h2">MARS Web UI</Typography>
        <br/>
        <ButtonPanel/>
        <br/>
        <br/>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={5}>
            <CameraPane cameraType='1'/>
            <br/>
            <CameraPane cameraType='2'/>
          </Grid>
          <Grid item xs={11}>
            <TabContainer/>
          </Grid>
        </Grid>
      </div>

      <div>{gamepads[0] ? message1 : ''}</div>
      <div>{gamepads[0] ? message2 : ''}</div>

    </SocketContext.Provider>
  );
}
