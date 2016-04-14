import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearFormErrors } from 'actions/AuthActions';
import { Link, browserHistory } from 'react-router';
import { containerStyle, formStyle } from './AuthForm.style';

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    user:       PropTypes.object,
    dispatch:   PropTypes.func.isRequired,
    authType:   PropTypes.string.isRequired,
    formAction: PropTypes.func.isRequired,
    formErrors: PropTypes.object
  };

  componentWillReceiveProps = (props) => {
    if (props.user) { browserHistory.push('/'); }
  }

  componentWillUnmount = () => {
    this.props.dispatch(clearFormErrors());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, formAction } = this.props;
    const { email, password } = this.refs;

    const formData = { email: email.value, password: password.value };

    dispatch(formAction(formData));
  }

  render() {
    const { authType, formErrors } = this.props;

    return (
      <div className={ `${authType}-container` } style={ containerStyle() }>
        <h1>{ authType }</h1>
        <form className={ authType } method="post" style={ formStyle() } onSubmit={ this.handleSubmit }>
          <input type="text" name="email" ref="email" placeholder="Email" />
          <input type="password" name="password" ref="password" placeholder="Password" />
          <div>
            <Link to="/landing">Close</Link>
            <button type="submit">{ authType }</button>
          </div>
        </form>

        {
          !!formErrors &&
          formErrors.map((errors, type) => {
            return (
              <p key={ type } className={ `${type}-errors` }>
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

export default connect(mapStateToProps)(AuthForm);
