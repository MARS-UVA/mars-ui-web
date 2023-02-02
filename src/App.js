import React, { useState } from 'react';
import { useGamepads } from 'react-gamepads';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContainer from './Components/TabContainer'
import CameraPane from './Components/CameraPane.js'
import ButtonPanel from './Components/ButtonPanel';

function App() {
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

  return (
    <div className="App">
      <Typography variant="h2">MARS Web UI</Typography>
      <br />
      <ButtonPanel />
      <br /><br />
      <Grid container columnSpacing={3}>
        <Grid item>
          <CameraPane cameraType='1' />
          <br />
          <CameraPane cameraType='2' />
        </Grid>
        <Grid item><TabContainer /></Grid>
      </Grid>
      <div>{gamepads[0] ? message1 : ''}</div>
      <div>{gamepads[0] ? message2 : ''}</div>
    </div>
  );
}

export default App;
