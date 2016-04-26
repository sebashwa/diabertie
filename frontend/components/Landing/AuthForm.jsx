import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import polyglot from 'lib/polyglot';
import Bertie from 'images/Bertie';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './AuthForm.css';

import * as authActions from 'actions/AuthActions';

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    p:               PropTypes.object,
    user:            PropTypes.object,
    route:           PropTypes.object.isRequired,
    formErrors:      PropTypes.object,
    clearFormErrors: PropTypes.func.isRequired,
  };

  componentWillReceiveProps = (props) => {
    if (props.user) { browserHistory.push('/'); }
  }

  componentWillUnmount = () => {
    this.props.clearFormErrors();
  }

  handleSubmit = (authType) => {
    return (e) => {
      e.preventDefault();
      const { email, password } = this.refs;

      const formData = { email: email.value, password: password.value };

      this.props[authType](formData);
    };
  }

  render() {
    const { route } = this.props;
    const authType = route.path == '/signup' ? 'signup' : 'login';
    const { formErrors } = this.props;
    const p = polyglot();

    return (
      <div className={ styles.container } >
        <Bertie className={ styles.bertie } />

        <h1>{ p.t(`Landing.${authType}`) }</h1>
        <form className={ styles.form } method="post" onSubmit={ this.handleSubmit(authType) }>
          <input type="text" name="email" ref="email" placeholder="Email" />
          <input type="password" name="password" ref="password" placeholder="Password" />

          <div className={ styles.interaction }>
            <Link to="/landing">back</Link>
            <button type="submit">{ "OK" }</button>
          </div>
        </form>

        {
          !!formErrors &&
          formErrors.map((errors, type) => {
            return (
              <p key={ type } className={ styles.errors }>
                { `${type.charAt(0).toUpperCase() + type.slice(1)} ${errors.join(',')}` }
              </p>
            );
          }).valueSeq()
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  user:       state.auth.get('user'),
  formErrors: state.auth.get('formErrors')
});

export default connect(mapStateToProps, { ...authActions })(withStyles(styles)(AuthForm));
