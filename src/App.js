import React from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContainer from './Components/TabContainer'
import CameraPane from './Components/CameraPane.js'
import ButtonPanel from './Components/ButtonPanel';

import {connecthandler, disconnecthandler} from './gamepad.js';

function App() {
  return (
    <div className="App">
      <Typography variant="h2">MARS Web UI</Typography>
      <br/>
      <ButtonPanel/>
      <br/><br/>
      <Grid container columnSpacing={3}>
        <Grid item>
          <CameraPane cameraType='1'/>
          <br/>
          <CameraPane cameraType='2'/>
        </Grid>
        <Grid item><TabContainer/></Grid>
      </Grid>
    </div>
  );
}

function connected(e) {
  console.log('GAMEPAD connected');
}
// console.log(connecthandler);
window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

export default App;
