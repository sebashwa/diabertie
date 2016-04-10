import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Main from 'components/index';
import App from 'components/App';
import Landing from 'components/Landing';

export default (
  <Route component={ Main } path="/">
    <IndexRoute component={ App } />
    <Route component={ Landing } path="/landing" />
    <Route component={ Landing } path="/signup" />
    <Route component={ Landing } path="/login" />
  </Route>
);
