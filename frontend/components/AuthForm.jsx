import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import polyglot from 'lib/polyglot';
import Bertie from 'images/Bertie';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './AuthForm.css';

import * as authActions from 'actions/AuthActions';

const p = polyglot();

class AuthForm extends Component {
  static propTypes = {
    user:            PropTypes.object,
    route:           PropTypes.object.isRequired,
    formErrors:      PropTypes.object,
    addFormErrors:   PropTypes.func.isRequired,
    clearFormErrors: PropTypes.func.isRequired,
  };

  componentWillReceiveProps = (props) => {
    if (props.user) { browserHistory.push('/'); }
  }

  componentWillUnmount = () => {
    this.props.clearFormErrors();
  }

  validateEmail = () => {
    const value = this.refs.email.value;
    const errors = [];

    if (value.length == 0) { errors.push(p.t('AuthForm.errors.empty')); }
    if (!(/.*\@.*/.test(value))) { errors.push(p.t('AuthForm.errors.format')); }

    this.props.addFormErrors({ email: errors });
  }

  validatePassword = () => {
    const value = this.refs.password.value;
    const errors = [];

    if (value.length == 0) { errors.push(p.t('AuthForm.errors.empty')); }

    this.props.addFormErrors({ password: errors });
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

    return (
      <div className={ styles.container } >
        <Bertie className={ styles.bertie } />

        <h1>{ p.t(`Landing.${authType}`) }</h1>
        <form className={ styles.form } method="post" onSubmit={ this.handleSubmit(authType) }>
          <input type="text" name="email" ref="email" placeholder="Email" onBlur={this.validateEmail} />
          <input type="password" name="password" ref="password" placeholder="Password" onBlur={this.validatePassword} />

          <div className={ styles.interaction }>
            <Link to="/landing">back</Link>
            <button type="submit">{ "OK" }</button>
          </div>
        </form>

        {
          !!formErrors && formErrors.map((errors, type) => {
            if (errors.length > 0 ) {
              return (
                <p key={ type } className={ styles.errors }>
                  { `${type.charAt(0).toUpperCase() + type.slice(1)} ${errors.join(', ')}` }
                </p>
              );
            };
          }).valueSeq()
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { user, formErrors } = state.auth.toObject();
  return { user, formErrors };
};

export default connect(mapStateToProps, { ...authActions })(withStyles(styles)(AuthForm));
