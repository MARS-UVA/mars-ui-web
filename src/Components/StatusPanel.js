import Typography from '@mui/material/Typography';
export default function StatusPanel(props){
    //check connection here
    var connection = "Disconnected";

    return (
        <div>
        <Typography variant="h3">{connection}</Typography>
        </div>
    )
}