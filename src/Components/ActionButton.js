import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { startActionClient } from '../ros-setup';
import '../action-configs/action_configs';
import { digConfig, raiseLadderConfig, lowerLadderConfig, raiseBinConfig, lowerBinConfig } from "../action-configs/action_configs";

export default function ActionButton({label}, type){

    var action_decription = "";

    switch(type) {
        case "raise_ladder":
            action_decription = raiseLadderConfig;
            break;
        case "lower_ladder":
            action_decription = lowerLadderConfig;
            break;
        case "raise_bin":
            action_decription = raiseBinConfig;
            break;
        case "lower_bin":
            action_decription = lowerBinConfig;
            break;
        default:
            action_decription = digConfig;
      }

    //activates on action button click
    function handleClick(){
        // TODO: grab actual json from files once editing functionality is finished
        var request = new ROSLIB.ServiceRequest({
            action_description_json: action_decription
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