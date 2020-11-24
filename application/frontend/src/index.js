import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'http://ec2-13-52-247-220.us-west-1.compute.amazonaws.com:5000/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common = {"X-Requested-With": "XMLHttpRequest","X-CSRFToken": "Origin, X-Requested-With, Content-Type, Accept, Authorization"};


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
