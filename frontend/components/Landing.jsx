import React, { Component } from 'react';
import { Link } from 'react-router';
import polyglot from 'lib/polyglot';

import Bertie from 'images/Bertie';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Landing.css';

class Landing extends Component {
  render() {
    const p = polyglot();

    return (
      <div className={ styles.root }>
        <div className={ styles.main }>
          <div className={ styles.bubble }>
            { p.t('Landing.bertieWelcome') }
          </div>

          <Bertie className={ styles.bertie }/>
        </div>

        <div className={ styles.footer }>
          <Link to="login">{ p.t('Landing.login') }</Link>
          <Link to="signup">{ p.t('Landing.signup') }</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);
