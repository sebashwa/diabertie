import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AuthForm from './AuthForm';
import { signup, login } from 'actions/AuthActions';
import { authFormStyle } from './index.style';


export default class Landing extends Component {
  static propTypes = {
    route: PropTypes.object
  };

  render() {
    const { route } = this.props;
    return (
      <div className="landing">
        {
          !(route.path == '/landing') &&
          <div className="auth-form" style={ authFormStyle() } >
            { (route.path == '/signup') && <AuthForm formAction={ signup } authType="signup" /> }
            { (route.path == '/login') && <AuthForm formAction={ login } authType="login" /> }
          </div>
        }
        Hey, my name is Bertie! I am your personal diabetes chatbot.
        <Link to="signup">Signup</Link>
        <Link to="login">Login</Link>
      </div>
    );
  }
}
