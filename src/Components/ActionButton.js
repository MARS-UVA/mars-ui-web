import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { startActionClient } from '../ros-setup';

export default function ActionButton({label}){

    //activates on action button click
    function handleClick(){
        // TODO: grab actual json from files once editing functionality is finished
        var request = new ROSLIB.ServiceRequest({
            action_description_json: "{ \
                \"name\": \"raise_ladder\", \
                \"update_delay\": 0.05, \
                \"speed\": 50, \
                \"raised_angle\": 52.0 \
            }"
        });
        
        let json = JSON.parse(request.action_description_json)

        startActionClient.callService(request, function(result) {
            console.log('Start action service called with action: ' + json.name + '.');
        });
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