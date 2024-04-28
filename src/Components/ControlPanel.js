import React from "react";
import ActionButton from './ActionButton'
import Grid from '@mui/material/Grid';

export default function ControlPanel(configs, setConfigs, driveMode){
    const {raiseLadderConfig, lowerLadderConfig, raiseBinConfig, lowerBinConfig, digConfig} = configs;
    const {setRaiseLadderConfig, setLowerLadderConfig, setRaiseBinConfig, setLowerBinConfig, setDigConfig} = setConfigs;
    return(
        <Grid container rowSpacing={2}>
            {driveMode=="dd" &&
                <div>
                    <h3>Max Wheel Power:</h3>
                    {/* <MotorSpeedSlider label={"Front Right Wheel"} type="frw" range={(0, 100)} val={100}/>
                    <MotorSpeedSlider label={"Front Left Wheel"} type="flw" range={(0, 100)} val={100}/>
                    <MotorSpeedSlider label={"Back Right Wheel"} type="brw" range={(0, 100)} val={100}/> */}
                    <MotorSpeedSlider label={"Wheels"} type="w" range={(0, 100)} val={100}/>
                    <h3>Max Motor Power:</h3>
                    <MotorSpeedSlider label={"Buckets Speed"} type="direct" range={(0, 100)} val={100}/>
                    <MotorSpeedSlider label={"Ladder Lift"} type="direct" range={(0, 100)} val={100}/>
                    <MotorSpeedSlider label={"Bucket Floor Speed"} type="direct" range={(0, 100)} val={100} />
                    <h3>Servo Range:</h3>
                    <MotorSpeedSlider label={"IR Servo"} type="ir" range={(0, 270)} min={0} val={270}/>
                    <MotorSpeedSlider label={"Webcam Servo"} type="webcam" range={(0, 270)} min={0} val={270}/>
                </div>
            }
            {driveMode=="autonomy" &&
                <div>
                    <h3>Wheel Power:</h3>
                    {/* <MotorSpeedSlider label={"Front Right Wheel"} type="frw_a" range={(0, 100)} val={100}/>
                    <MotorSpeedSlider label={"Front Left Wheel"} type="frw_a" range={(0, 100)} val={100}/>
                    <MotorSpeedSlider label={"Back Right Wheel"} type="brw_a" range={(0, 100)} val={100}/> */}
                    <MotorSpeedSlider label={"Wheels"} type="w_a" range={(0, 100)} val={100}/>
                    <h3>Average Motor Power:</h3>
                    <MotorSpeedSlider label={"Buckets Speed"} type="action" range={(0, 100)} config={{digConfig, setDigConfig}} val={digConfig.speed}/>
                    <MotorSpeedSlider label={"Raise Ladder Speed"} type="action" range={(0, 100)} config={{raiseLadderConfig, setRaiseLadderConfig}} val={raiseLadderConfig.speed}/>
                    <MotorSpeedSlider label={"Lower Ladder Speed"} type="action" range={(0, 100)} config={{lowerLadderConfig, setLowerLadderConfig}} val={lowerLadderConfig.speed}/>
                    <h3>Servo:</h3>
                    <MotorSpeedSlider label={"IR Servo"} type="ir" range={(0, 270)} min={0} val={270}/>
                    <MotorSpeedSlider label={"Webcam Servo"} type="webcam" range={(0, 270)} min={0} val={270}/>
                </div>
            }
        </Grid>
    );
}