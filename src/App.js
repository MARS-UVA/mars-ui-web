import React, { useEffect, useRef } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContainer from './Components/TabContainer'
import CameraPane from './Components/Camera.js'
import ButtonPanel from './Components/ButtonPanel';

import { proxyStreamToRequest } from "./proxyConnection.js";

export default function App() {

  let val = useRef(1);
  let stream = useRef(proxyStreamToRequest("/SendDDCommand"));

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("interval i=", val.current);
      val.current = val.current + 1;
    }, 800);

    return () => clearInterval(timer);
  });

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
