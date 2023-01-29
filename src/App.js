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
import * as ROSLIB from 'roslib';

function isConnected(){
  document.write(conn);
  //add code to see if is connected. if so , change Disconnected to Connected
  return conn
}
function App() {

  console.log("testing!");

  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  // Subscribing to a Topic
  // ----------------------

  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/listener',
    messageType : 'std_msgs/String'
  });

  listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    listener.unsubscribe();
  });

  var talker = new ROSLIB.Topic({
    ros : ros,
    name : '/talker',
    messageType : 'std_msgs/String'
  });

  var message = new ROSLIB.Message({data: "test publishing"});
  talker.publish(message);

  return (
    <div className="App">
      <Typography variant="h2">MARS Web UI</Typography>
      <StatusPanel/>
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

export default App;
