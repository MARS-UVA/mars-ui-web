import React from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import DriveModeButtonPanel from './Components/DriveModeButtonPanel';
import './ros-setup';

function App() {

  return (
    <div className="App"  style={{ marginLeft:'20px' }}>
      <Typography variant="h2">MARSWebUI</Typography>
      <br/>
      <DriveModeButtonPanel/>
    </div>
  );
}

export default App;
