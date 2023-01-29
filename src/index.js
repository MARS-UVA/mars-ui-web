import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const handler = (event) => {
  this.props.App.handleKeyPress(event);
}
root.render(
  //if there are issues caused by sending GRPC commands twice (etc), remove strict mode
  <React.StrictMode>
    <App onKeyDown={handler}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
