import React, { useContext } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { SocketContext } from "../SocketClientContext";

export default function ActionButton({label}){

    const socket = useContext(SocketContext);

    //activates on action button click
    function handleClick(){
        console.log("action") //TODO: REPLACEME WITH GRPC
        socket.emit("StartAction", {"text": "{'foo':'bar'}"});
    }

    //activates when edit button clicked
    function handleEdit(){
        console.log("edit")
    }

    return(
        <Grid container item columnSpacing={2}>
            <Grid item xs={3}><Button fullWidth variant="contained" onClick={()=>handleClick()}>{label}</Button></Grid>
            <Grid item xs={1}><Button variant="outlined" onClick={()=>handleEdit()}>Edit</Button></Grid>
        </Grid>
    );
}