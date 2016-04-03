import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Main from 'components/index';
import App from 'components/App';
import Landing from 'components/Landing';
import SignupForm from 'components/authentication/SignupForm';
import LoginForm from 'components/authentication/LoginForm';

export default (
  <Route component={ Main } path="/">
    <IndexRoute component={ App } />
    <Route component={ Landing } path="/landing" />
    <Route component={ SignupForm } path="/signup" />
    <Route component={ LoginForm } path="/login" />
  </Route>
);
