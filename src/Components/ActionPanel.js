import React from "react";
import ActionButton from './ActionButton'
import Grid from '@mui/material/Grid';

export default function ActionPanel(){

    return(
    <Grid container rowSpacing={2}>
        <ActionButton label={"Raise Bucket Ladder"}/>
        <ActionButton label={"Lower Bucket Ladder"}/>
        <ActionButton label={"Raise Deposit Bin"}/>
        <ActionButton label={"Lower Deposit Bin"}/>
        <ActionButton label={"Dig"}/>
    </Grid>);
}