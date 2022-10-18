import React from 'react';
import './Camera.css';

class CameraPane extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rate: 0,
        status: 'on',
        cameraType: 1,
      }
    }
    handleClick = () => { // when toggle camera feed button is clicked

    }
    handleChange = () => { // change in camera rate input

    }
    render() {
        return (
            <div>
                <div className='feed'>
                    <CameraFeed status = {this.state.status} type={this.state.cameraType}/>
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
           <p>camera feed image</p>
        );
    }
}

export default CameraPane;