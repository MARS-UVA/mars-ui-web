import React from 'react';
import './Camera.css';

class CameraPane extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rate: 0,
        temprate: 0, // saves user input before "Set Rate" button is pressed
        status: 'on',
      }
    }
    handleClick = () => { // when toggle camera feed button is clicked
        this.setState({status: this.state.status === 'on'? 'off' : 'on'})
    }
    handleChange = (event) => { // change in camera rate input
        this.setState({temprate: event.target.value}); 
    }
    confirmRate = () => {
        this.setState({rate: this.state.temprate})
        console.log("rate: ", this.state.temprate)
    }
    render() {
        return (
            <div className = 'pane'>
                <div className='feed'>
                    <CameraFeed status = {this.state.status} type={this.props.cameraType}/>
                </div>
                <div>
                    <button onClick={this.handleClick}>
                        Toggle Camera Feed
                    </button>
                    <label>
                        Camera Rate: 
                        <input type="text" size = "4" value={this.state.temprate} onChange={this.handleChange}/>
                    </label>
                    <button onClick ={this.confirmRate}>
                        Set Rate
                    </button>
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
                {this.props.status === 'on' && (
                    <img src={require('./cameraimage.jpeg')} width='100px' height = '100px' alt=''/>
                )} 
                {/* only renders image when camera status is set to on */}
            </div>
        );
    }
}

export default CameraPane;