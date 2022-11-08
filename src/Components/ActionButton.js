import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function ActionButton({label}){

    function handleClick(){
        console.log("action") //TODO: REPLACEME WITH GRPC
    }

    function handleEdit(){
        console.log("edit")
    }

    return(
        <Grid container item spacing={2}>
            <Grid item xs={2}><Button fullWidth variant="contained" onClick={()=>handleClick()}>{label}</Button></Grid>
            <Grid item><Button variant="outlined" onClick={()=>handleEdit()}>Edit</Button></Grid>
        </Grid>
    );
}