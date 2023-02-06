import React, { useContext, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { proxyRequest } from "../proxyConnection";
import { SocketContext } from "../SocketClientContext";

export default function ButtonPanel() {

  const socket = useContext(SocketContext);

  //state for updating drive mode
  const [driveMode, setDriveMode] = useState("0");

  //onclick handler that updates state
  const handleChange = (event, newDriveMode) => {
    setDriveMode(newDriveMode);
    socket.emit("ChangeDriveState", {"dse": parseInt(newDriveMode)});
  };


  function handleESTOP(){
    socket.emit("EmergencyStop", {});
  }

  return (
    <div>
      <Typography>Drive Mode:</Typography>
      <ToggleButtonGroup
        value={driveMode}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton sx={{width: 110}} value="2">Idle</ToggleButton> {/* values correspond to enum in jetsonrpc.proto */}
        <ToggleButton sx={{width: 110}} value="0">DD</ToggleButton>
        <ToggleButton sx={{width: 110}} value="1">Autonomy</ToggleButton>
      </ToggleButtonGroup>

      <Button sx={{ml:5}} variant="contained" size="large" color="error" onClick={()=>handleESTOP()}>ESTOP</Button>
    </div>
  );
}