import React from "react";
// import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
// import Checkbox from '@mui/material/Checkbox';

class HeroFeedbackPanel extends React.Component {

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
                        <h4>Bucket Ladder Angles</h4>
                        <p>Right: {this.props.rightActuator.toFixed(3)}</p>
                        <p>Left: {this.props.leftActuator.toFixed(3)}</p>
                        <h4>Chain Current</h4>
                        <p>{this.props.chainCurrent}</p>
                        <h4>Wheel Currents</h4>
                        <p>Forward Left: {this.props.forwardLWheelCurrent.toFixed(3)}</p>
                        <p>Rear Left: {this.props.rearLWheelCurrent.toFixed(3)}</p>
                        <p>Forward Right: {this.props.forwardRWheelCurrent.toFixed(3)}</p>
                        <p>Rear Right: {this.props.rearRWheelCurrent.toFixed(3)}</p>
                    </div>
                    <br></br>
                </>
            </Grid>
        );
    }
}

export default HeroFeedbackPanel;