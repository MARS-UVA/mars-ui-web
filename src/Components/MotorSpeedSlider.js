import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as ROSLIB from 'roslib';
import { startActionClient } from '../ros-setup';
import '../action-configs/action_configs';
import { digConfig, raiseLadderConfig, lowerLadderConfig, raiseBinConfig, lowerBinConfig } from "../action-configs/action_configs";

export default function MotorControlSlider({ label, type, range, config=null, min=0, val }) {
    const condition = (type === "ir" || type === "webcam") ? true : false;

    //activates on action button click
    function handleClick() {
        // TODO: grab actual json from files once editing functionality is finished
        var request = new ROSLIB.ServiceRequest({
            action_description_json: action_decription
        });

        let json = JSON.parse(request.action_description_json)

        startActionClient.callService(request, function (result) {
            console.log('Start action service called with action: ' + json.name + '.');
        });
    }

    //activates when edit button clicked
    function handleEdit() {
        console.log("edit")
    }

    const handleSliderChange = (event, newValue) => {
        if (type === "action") {
            const { thisConfig, setConfig } = config;
            setConfig({ ...thisConfig, speed: newValue });
        }
    }

    const handleRangeChange = (event, newValue) => {
        //Handle IR and webcam servos
    }

    return (
        <Grid container item columnSpacing={2}>
            <Grid item xs={1}><p>{label}</p></Grid>
            <Grid item xs={3}>
            {condition ? (
                <Slider
                    value={[min, val]}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={range[0]}
                    max={range[1]}
                />
            ) : (
                <Slider
                    value={val}
                    onChange={handleSliderChange}
                    min={range[0]}
                    max={range[1]}
                    valueLabelDisplay="auto"
                />
            )}
            </Grid>
        </Grid>
    );
}