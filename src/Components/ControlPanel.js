import React from "react";
import ActionButton from './ActionButton'
import Grid from '@mui/material/Grid';

export default function ActionPanel(){

    return(
        <Grid container rowSpacing={2}>
            <MotorSpeedSlider label={"Front Right Wheel"} type="frw" range={(0, 100)}/>
            <MotorSpeedSlider label={"Front Left Wheel"} type="flw" range={(0, 100)}/>
            <MotorSpeedSlider label={"Back Right Wheel"} type="brw" range={(0, 100)}/>
            <MotorSpeedSlider label={"Back Left Wheel"} type="blw" range={(0, 100)}/>
            <MotorSpeedSlider label={"Buckets Speed"} type="dig" range={(0, 100)}/>
            <MotorSpeedSlider label={"Ladder Lift"} type="ladder" range={(0, 100)}/>
            <MotorSpeedSlider label={"Bucket Floor Speed"} type="dump" range={(0, 100)}/>
            <MotorSpeedSlider label={"IR Servo"} type="ir" range={(0, 270)}/>
            <MotorSpeedSlider label={"Webcam Servo"} type="webcam" range={(0, 270)}/>
        </Grid>
    );
}