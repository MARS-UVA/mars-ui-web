import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { startActionClient } from '../ros-setup';
import '../action-configs/action_configs';
import { digConfig, raiseLadderConfig, lowerLadderConfig, raiseBinConfig, lowerBinConfig } from "../action-configs/action_configs";

export default function ActionButton({label}, type, {config}){
    let config = config
    var action_decription = "";
    switch(type) {
        case "raise_ladder":
            action_decription = "{ \
                \"name\": \"${config.name}\", \
                \"update_delay\": ${config.update_delay}, \
                \"speed\": ${config.speed}, \
                \"raised_angle\": ${config.raised_angle} \
            }";
            break;
        case "lower_ladder":
            action_decription = "{ \
                \"name\": \"${config.name}\", \
                \"update_delay\": ${config.update_delay}, \
                \"speed\": ${config.speed}, \
                \"raised_angle\": ${config.raised_angle} \
            }";
            break;
        case "raise_bin":
            action_decription = "{ \
                \"name\": \"${config.name}\", \
                \"update_delay\": ${config.update_delay}, \
                \"speed\": ${config.speed}, \
            }";
            break;
        case "lower_bin":
            action_decription = "{ \
                \"name\": \"${config.name}\", \
                \"update_delay\": ${config.update_delay}, \
                \"speed\": ${config.speed}, \
                \"lowered_angle\": ${config.lowered_angle} \
            }";
            break;
        default:
            action_decription = "{ \
                \"name\": \"${config.name}\", \
                \"update_delay\": ${config.update_delay}, \
                \"speed\": ${config.speed}, \
                \"duration\": ${config.lowered_angle} \
            }";
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