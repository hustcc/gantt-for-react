require('./demo.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import MainPageComponent from './MainPageComponent.jsx';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={MainPageComponent}>
    </Route>
  </Router>),
  document.querySelector('#wrapper')
);
