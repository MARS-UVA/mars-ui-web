import React from "react";
// import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
// import Checkbox from '@mui/material/Checkbox';

class FeedbackPanel extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        // checkboxStatuses : new Array(this.props.currents.length).fill(true),
      }
      
    }

    // handleCheckboxChange = (arrayIndex) => {
    //     const updatedCheckedState = this.state.checkboxStatuses.map((item, index) =>
    //         index === arrayIndex ? !item : item
    //     );

    //     this.setState({checkboxStatuses: updatedCheckedState});
    // };

    render() {
        return (
            <Grid container>
                <>
                    <div class = "image-container">
                        <h4>Limit Switches Triggered?</h4>
                        <p>Bucket Ladder: {this.props.bucketContact.toString()}</p>
                        <p>Construction Bin: {this.props.constructionBinContact.toString()}</p>
                        <h4>IR Reading</h4>
                        <p>{this.props.irReading.toFixed(3)}</p>
                        <h4>Wheel Currents</h4>
                        <p>Forward Left: {this.props.forwardLWheelCurrent.toFixed(3)}</p>
                        <p>Rear Left: {this.props.rearLWheelCurrent.toFixed(3)}</p>
                        <p>Forward Right: {this.props.forwardRWheelCurrent.toFixed(3)}</p>
                        <p>Rear Right: {this.props.rearRWheelCurrent.toFixed(3)}</p>
                        <h4>Actuator Currents</h4>
                        <p>Bucket Ladder: {this.props.bucketLadderActuatorCurrent.toFixed(3)}</p>
                        <p>Construction Bin: {this.props.constructionBinActuatorCurrent.toFixed(3)}</p>
                        <h4>Chain Current</h4>
                        <p>{this.props.bucketLadderChainCurrent.toFixed(3)}</p>
                    </div>
                    <br></br>
                </>
            </Grid>
        );
    }
}

export default FeedbackPanel;