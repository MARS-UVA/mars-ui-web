import React from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContainer from './Components/TabContainer'
import CameraPane from './Components/Camera.js'
import ButtonPanel from './Components/ButtonPanel';

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
        <TabContainer/>
      </Grid>
    </div>
  );
}

export default App;
