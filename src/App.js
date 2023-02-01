import React from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContainer from './Components/TabContainer'
import CameraPane from './Components/CameraPane.js'
import ButtonPanel from './Components/ButtonPanel';
import StatusPanel from './Components/StatusPanel';
var conn="Disconnected";
import DriveModeButtonPanel from './Components/DriveModeButtonPanel';
import './ros-setup';
import * as ROSLIB from 'roslib';

function isConnected(){
  document.write(conn);
  //add code to see if is connected. if so , change Disconnected to Connected
  return conn
}
function App() {

  return (
    <div className="App">
      <Typography variant="h2">MARS Web UI</Typography>
      <StatusPanel/>
      <br/>
      <DriveModeButtonPanel/>
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

export default App;
