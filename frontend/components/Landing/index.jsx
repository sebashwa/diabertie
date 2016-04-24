import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import polyglot from 'lib/polyglot';

import Modal from 'react-modal';
import Bertie from 'images/Bertie';
import AuthForm from './AuthForm';

import { signup, login } from 'actions/AuthActions';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './index.css';


class Landing extends Component {
  static propTypes = {
    route: PropTypes.object
  };

  render() {
    const { route } = this.props;
    const p = polyglot();

    return (
      <div className={ styles.root }>
        <Modal isOpen={ route.path != '/landing' }>
          { route.path == '/signup' && <AuthForm formAction={ signup } authType="signup" p={ p } /> }
          { route.path == '/login' && <AuthForm formAction={ login } authType="login" p={ p } /> }
        </Modal>

        <div className={ styles.main }>
          <div className={ styles.bubble }>
            { p.t('Landing.bertieWelcome') }
          </div>

          <Bertie className={ styles.bertie }/>
        </div>

        <div className={ styles.footer }>
          <Link to="signup">{ p.t('Landing.signup') }</Link>
          <Link to="login">{ p.t('Landing.login') }</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);
