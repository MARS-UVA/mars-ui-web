import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function ActionButton({label}){

    //activates on action button click
    function handleClick(){
        console.log("action") //TODO: REPLACEME WITH GRPC
    }

    //activates when edit button clicked
    function handleEdit(){
        console.log("edit")
    }

    return(
        <Grid container item columnSpacing={2}>
            <Grid item xs={3}><Button fullWidth variant="contained" onClick={()=>handleClick()}>{label}</Button></Grid>
        </Grid>
    );
}