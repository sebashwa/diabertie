import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import { Layout } from './modules/Layout';
import HowTo from './modules/HowTo';
import Landing from './modules/Landing';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Landing}/>
      <Route path="/howto" component={HowTo}/>
    </Route>
  </Router>
), document.getElementById('main'))

