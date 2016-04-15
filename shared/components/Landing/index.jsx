import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import polyglot from 'lib/polyglot';

import AuthForm from './AuthForm';
import { signup, login } from 'actions/AuthActions';
import { authFormStyle } from './index.style';


export default class Landing extends Component {
  static propTypes = {
    route: PropTypes.object
  };

  render() {
    const { route } = this.props;
    const p = polyglot();

    return (
      <div className="landing">
        {
          !(route.path == '/landing') &&
          <div className="auth-form" style={ authFormStyle() } >
            { (route.path == '/signup') && <AuthForm formAction={ signup } authType="signup" p={ p } /> }
            { (route.path == '/login') && <AuthForm formAction={ login } authType="login" p={ p } /> }
          </div>
        }
        { p.t('Landing.bertieWelcome') }
        <Link to="signup">{ p.t('Landing.signup') }</Link>
        <Link to="login">{ p.t('Landing.login') }</Link>
      </div>
    );
  }
}
