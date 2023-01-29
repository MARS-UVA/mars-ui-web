import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {talker} from '../ros-setup';
import * as ROSLIB from 'roslib';

export default function ActionButton({label}){

    //activates on action button click
    function handleClick(){
        // console.log("action") //TODO: REPLACEME WITH GRPC
        var message = new ROSLIB.Message({data: "action button pressed!"});
        talker.publish(message);
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