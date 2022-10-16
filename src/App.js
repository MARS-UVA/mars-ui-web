import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>MARS Web UI</h1>
      <Tabs/>
    </div>
  );
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "graph",
    };
  }
  handleClick = (newTab) => {
    this.setState({ activeTab: newTab });
    console.log("clicked", newTab);
  }
  render() {
    const activeTab = this.state.activeTab;
    console.log(activeTab)
    return (
      <div className='tabs'>
        <ul className='nav'>
          <li
            className={activeTab === "graph" ? 'active' : ''}
            onClick={() => this.handleClick("graph")}>
            Graph
            </li>
          <li
            className={activeTab === "actions" ? 'active' : ''}
            onClick={() => this.handleClick("actions")}>
              Actions
            </li>
        </ul>
        <div className='content'>
          {this.state.activeTab === "graph" ? <GraphsTab /> : <ActionTab />}
        </div>
      </div>
    );
  }
}

const GraphsTab = () => {
  return (
      <div className ='GraphsTab'>
          <p>Graphs Tab Content</p>
      </div>
  )
}

const ActionTab = () => {
  return (
      <div className ='ActionTab'>
          <p>Action Tab Content</p>
      </div>
  )
}

export default App;
