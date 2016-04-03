import React, { Component } from 'react';
import { signup } from 'actions/AuthActions';
import AuthForm from './AuthForm';

export default class SignupForm extends Component {
  render() { return <AuthForm formAction={ signup } authType="Signup" />; }
};
