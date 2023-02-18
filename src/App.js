import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TabContainer from './Components/TabContainer'
import CameraPane from './Components/CameraPane.js'
import ButtonPanel from './Components/ButtonPanel';
import { socket, SocketContext } from "./SocketClientContext.js";

export default function App() {

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
    </SocketContext.Provider>
  );
}
