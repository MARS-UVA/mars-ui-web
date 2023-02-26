import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';

class HeroFeedbackPanel extends React.Component {
    
    render() {
        return (
            <Grid container>
                <>
                    <div>
                        <h4>Bucket Ladder Angles</h4>
                        <p>Right: {this.props.rightAngle.toFixed(3)}</p>
                        <p>Left: {this.props.leftAngle.toFixed(3)}</p>
                        <h4>Deposit Bin Status</h4>
                        <p>Raised: {this.props.binRaised}</p>
                        <p>Lowered: {this.props.binLowered}</p>
                    </div>
                    <br></br>
                    <div>
                        <h4>Motor Currents</h4>
                        {this.props.currents.map((current, index) => (
                            <div>
                                <FormControlLabel control={ <Checkbox
                                    checked={true}
                                    onChange={console.log("checked")}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                /> } label="" />
                                Motor {index + 1}: {current.toFixed(3)}
                            </div>)
                        )}
                    </div>
                </>
            </Grid>
        );
    }
}

export default HeroFeedbackPanel;