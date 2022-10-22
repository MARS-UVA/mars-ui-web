import React from 'react';
import './Camera.css';

class CameraPane extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rate: 0,
        status: 'on',
      }
    }
    handleClick = () => { // when toggle camera feed button is clicked
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
                <div className='buttons'>
                    <button onClick={() => this.handleClick}>
                        Toggle Camera Feed
                    </button>
                    <label>
                        Camera Rate: 
                        <input type="text" size = "4" value={this.state.rate} onChange={this.handleChange}/>
                    </label>
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
                <p>camera {this.props.type} feed image</p>
                <img src={require('./cameraimage.jpeg')} width='50px' height = '50px' alt=''/>
            </div>
        );
    }
}

export default CameraPane;