import Typography from '@mui/material/Typography';
import { connectionStatus } from '../ros-setup';

export default function StatusPanel(props){
    //check connection here
    var connection = connectionStatus;

    return (
        <div>
        <Typography variant="p">Jetson Connection Status: {connection}</Typography>
        </div>
    )
}