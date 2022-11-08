import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Typography from '@mui/material/Typography';

import TabContainer from './Components/TabContainer'


function App() {
  return (
    <div className="App">
      <Typography variant="h2">MARS Web UI</Typography>
      <TabContainer/>
    </div>
  );
}



export default App;
