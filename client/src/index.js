import React from 'react';
import ReactDOM from 'react-dom';

import './css/neumorph.css';
import './css/index.css';
import Poppin from './fonts/font';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <Poppin/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

