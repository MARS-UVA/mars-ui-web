import React from 'react';
import '../Camera.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { videoSubscriber } from "../ros-setup";

class CameraPane extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        rate: 0,
        status: 'on',
      }
      
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
        
        this.state = {
            video: 'test',
        }
        this.setUpSubscriber();
    }

    setUpSubscriber = () => {
        videoSubscriber.subscribe(message => {
            this.setState({video: message.data});
        }
      );
    }

    render() {
        return (
            <div class = "image-container">
            <img src={`data:image/jpeg;base64, ${this.state.video}`} alt = "camera feed" />
            </div>
        );
    }
}

export default CameraPane;