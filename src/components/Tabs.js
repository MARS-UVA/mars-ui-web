import React from "react";
import GraphTab from "./TabViews/GraphTab";
import ActionsTab from "./TabViews/ActionsTab.js";

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: "graphs",
    };
  }

  render () {
    return (
    <div className="Tabs">
      <ul className="nav">
        <li className={this.state.activeTab === "graphs" ? "active" : ""} onClick={() => this.setState({activeTab: 'graphs'})}>Graphs</li>
        <li className={this.state.activeTab === "actions" ? "active" : ""} onClick={() => this.setState({activeTab: 'actions'})}>Actions</li>
      </ul>

      <div className="outlet">
        {this.state.activeTab === "graphs" ? <GraphTab /> : <ActionsTab />}
      </div>
    </div>
  );
}
}

export default Tabs;