import React, { Component } from 'react';
import { login } from 'actions/AuthActions';
import AuthForm from './AuthForm';

export default class LoginForm extends Component {
  render() { return <AuthForm formAction={ login } authType="Login" />; }
};
