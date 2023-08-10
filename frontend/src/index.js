import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss'; // Import SCSS styles
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root'); // Get the root element

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root // Render the App component inside the root element
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
