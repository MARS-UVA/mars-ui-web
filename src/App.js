import React from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import DriveModeButtonPanel from './Components/DriveModeButtonPanel';
import './ros-setup';
import ActionPanel from "./Components/ActionPanel";
import GraphPanel from './Components/GraphPanel';

function App() {

  return (
    <div className="App">
      <Typography variant="h2">MARS Web UI</Typography>
      <br/>
      <DriveModeButtonPanel/>
      <br/>
      <ActionPanel/>
      <br/>
      <GraphPanel />
  </div>
  );
}

export default App;
