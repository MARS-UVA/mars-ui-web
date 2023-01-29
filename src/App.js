import React from 'react';

import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContainer from './Components/TabContainer'
import CameraPane from './Components/CameraPane.js'
import ButtonPanel from './Components/ButtonPanel';
import { Change, handleESTOP } from './Components/ButtonPanel';

//import useKeypress from 'react-use-keypress';

function App(props) {
  //const [state, setState] = useState('');

  const idlePress = useKeyPress("i", props);
  const ddpress = useKeyPress("d", props);
  const autoPress = useKeyPress("a", props);
  const space_press = useKeyPress(" ", props);

  const modes = ["idle", "dd", "auto", "estop"]; //robot drive modes
  const mode = "idle";

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

// Hook
function useKeyPress(targetKey, props) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  
  const setButtonPanel = (mode) => {   //to communicate with button panel
    if(mode == "stop"){
      handleESTOP();
      console.log("Robot stopping");
    }
    else{
      Change(mode);
      console.log("Robot in "+mode+" mode");
    }
  }

  function downHandler({ key }) {
    if (key === "i") {
      setKeyPressed(true);
      console.log("Idle mode requested");
      setButtonPanel("idle");
    }
    else if (key == "d"){
      setKeyPressed(true);
      console.log("DD mode requested");
      setButtonPanel("dd");
    }
    else if (key == "a"){
      setKeyPressed(true);
      console.log("Autonomous mode requested");
      setButtonPanel("auto");
    }
    else if (key == " "){
      setKeyPressed(true);
      console.log("Space bar pressed");
      setButtonPanel("stop");
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default App;
