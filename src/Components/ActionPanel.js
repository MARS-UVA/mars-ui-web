import React from "react";
import ActionButton from './ActionButton'
import Grid from '@mui/material/Grid';

export default function ActionPanel({driveMode}){
    const [raiseLadderConfig, setRaiseLadderConfig] = useState({
        name: "raise_ladder",
        update_delay: 0.05,
        speed: 50,
        raised_angle: 52.0
    });
    const [lowerLadderConfig, setLowerLadderConfig] = useState({
        name: "lower_ladder",
        update_delay: 0.1,
        speed: 70,
        raised_angle: 45.0
    });
    const [raiseBinConfig, setRaiseBinConfig] = useState({
        name: "raise_bin",
        update_delay: 0.05,
        speed: 30
    });

    const [lowerBinConfig, setLowerBinConfig] = useState({
        name: "lower_bin",
        update_delay: 0.05,
        speed: 30,
        lowered_angle: 40
    });

    const [digConfig, setDigConfig] = useState({
        name: "dig",
        update_delay: 0.1,
        speed: 50,
        duration: 10
    });
    let configs = {raiseLadderConfig, lowerLadderConfig, raiseBinConfig, lowerBinConfig, digConfig};
    let setConfigs = {setRaiseLadderConfig, setLowerLadderConfig, setRaiseBinConfig, setLowerBinConfig, setDigConfig};

    return(
    <Grid container rowSpacing={2}>
        {driveMode=="autonomy" && 
            <Grid xs={6}>
                <ActionButton label={"Raise Bucket Ladder"} type="raise_ladder" config={raiseLadderConfig}/>
                <ActionButton label={"Lower Bucket Ladder"} type="lower_ladder" config={lowerLadderConfig}/>
                <ActionButton label={"Raise Deposit Bin"} type="raise_bin" config={raiseBinConfig}/>
                <ActionButton label={"Lower Deposit Bin"} type="lower_bin" config={lowerBinConfig}/>
                <ActionButton label={"Dig"} type="dig"  config={digConfig}/>
            </Grid>
        }
        <Grid xs={6}>
            <ControlPanel configs={configs} setConfigs={setConfigs} driveMode={driveMode}/>
        </Grid>
    </Grid>
    );
}