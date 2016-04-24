import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Main from 'components/index';
import App from 'components/App';
import Landing from 'components/Landing';
import AuthForm from 'components/Landing/AuthForm';

export default (
  <Route component={ Main } path="/">
    <IndexRoute component={ App } />
    <Route component={ Landing } path="/landing" />
    <Route component={ AuthForm } path="/signup" />
    <Route component={ AuthForm } path="/login" />
  </Route>
);
