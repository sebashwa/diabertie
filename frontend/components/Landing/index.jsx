import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import polyglot from 'lib/polyglot';
import Modal from 'components/global/Modal';

import Bertie from 'images/Bertie';
import AuthForm from './AuthForm';
import { signup, login } from 'actions/AuthActions';


export default class Landing extends Component {
  static propTypes = {
    route: PropTypes.object
  };

  render() {
    const { route } = this.props;
    const p = polyglot();

    return (
      <div className="landing">
        { !(route.path == '/landing') &&
          ((route.path == '/signup') && <Modal><AuthForm formAction={ signup } authType="signup" p={ p } /></Modal> ||
          (route.path == '/login') && <Modal><AuthForm formAction={ login } authType="login" p={ p } /></Modal>) }

        <Bertie width={200} height={150} />
        { p.t('Landing.bertieWelcome') }
        <Link to="signup">{ p.t('Landing.signup') }</Link>
        <Link to="login">{ p.t('Landing.login') }</Link>
      </div>
    );
  }
}
