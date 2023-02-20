import React from 'react';
import '../Camera.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { videoSubscriber } from "../ros-setup";

class CameraPane extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        rate: 0,
        status: 'on',
        video: '',
      }

      videoSubscriber.subscribe(function(message) {
        // this.state.video = message.data; 
      
        console.log("data format is: " + message.format);
        console.log("The data received is: " + message.data);
        this.setState({video: message.data});
      });
    }
    handleClick = () => { // when toggle camera feed button is clicked
        console.log(this.state.status);
        this.setState({status: this.state.status === 'on'? 'off' : 'on'})
    }
    handleChange = (event) => { // change in camera rate input
        this.setState({rate: event.target.value}); 
    }
    render() {
        return (
            <div>
                <div className='feed'>
                    <CameraFeed status = {this.state.status} type={this.props.cameraType}/>
                    <img>{this.state.video}</img>
                </div>
                <br/>
               
                    <div className='inputField'>
                        <Button sx={{ mr: 2 }} variant="contained" className="buttonStyle" onClick={()=>this.handleClick()}>
                            Toggle Camera Feed
                        </Button>
                       <TextField label="Camera Rate:" variant="outlined" size="small" value={this.state.rate} onChange={this.handleChange}/>
                    </div>
                
            </div>
        );
    }
}

class CameraFeed extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>camera {this.props.type} feed image {this.props.status}</p>
                <img src={require('../Images/cameraimage.jpeg')} width='50px' height = '50px' alt=''/>
            </div>
        );
    }
}

export default CameraPane;