import React from "react";
import ActionButton from './ActionButton'
import Grid from '@mui/material/Grid';

export default function ActionPanel(){

    return(
    <Grid container rowSpacing={2}>
        <ActionButton label={"Raise Bucket Ladder"} type="raise_ladder"/>
        <ActionButton label={"Lower Bucket Ladder"} type="lower_ladder"/>
        <ActionButton label={"Raise Deposit Bin"} type="raise_bin"/>
        <ActionButton label={"Lower Deposit Bin"} type="lower_bin"/>
        <ActionButton label={"Dig"} type="dig"/>
    </Grid>);
}