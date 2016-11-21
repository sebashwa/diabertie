import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import { Layout } from './modules/Layout';
import HowTo from './modules/HowTo';
import Landing from './modules/Landing';

render((
  <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Landing}/>
      <Route path="/howto" component={HowTo}/>
    </Route>
  </Router>
), document.getElementById('main'))

