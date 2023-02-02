import React from "react";

class HeroFeedbackPanel extends React.Component {
    
    render() {
        return (
            <div>
               <p>Bucket Ladder Angle: {this.props.angle}</p>
               <p>Currents: {this.props.currents}</p>
               <p>Deposit Bin Raised: {this.props.binRaised}</p>
            </div>
        );
    }
}

export default HeroFeedbackPanel;