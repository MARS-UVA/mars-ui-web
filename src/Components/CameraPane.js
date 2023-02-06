import React from 'react';
import '../Camera.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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