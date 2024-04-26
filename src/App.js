import React from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';
import DriveModeButtonPanel from './Components/DriveModeButtonPanel';
import './ros-setup';
import ActionPanel from "./Components/ActionPanel"
import StatusPanel from './Components/StatusPanel';
import TabContainer from './Components/TabContainer';

function App() {
  const [driveMode, setDriveMode] = useState('idle');

  const updateDriveMode = (newValue) => {
    setDriveMode(newValue);
  };

  return (
    <div className="App">
      <Typography variant="h2">MARS Web UI</Typography>
      <br/>
      <DriveModeButtonPanel driveMode={driveMode} updateDriveMode={updateDriveMode} />
      <br/>
      <StatusPanel/>
      <br/>
      <TabContainer driveMode={driveMode} updateDriveMode={updateDriveMode}/>
    </div>
  );
}

export default App;
