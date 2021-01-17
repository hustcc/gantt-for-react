import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main';

require('./demo.css');

ReactDOM.render(
  <Main />,
  document.querySelector('#wrapper')
);
