import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    authType: PropTypes.string.isRequired,
    formAction: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentWillReceiveProps = (props) => {
    if (props.user) { browserHistory.push('/') };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, formAction } = this.props;
    const { email, password } = this.refs;
    const formData = { email: email.value, password: password.value };

    dispatch(formAction(formData));
  }

  render() {
    const { authType } = this.props;

    return (
      <form className={ authType.toLowerCase() } method='post'>
        <Link to="/landing">Close</Link>
        <input type='text' name='email' ref='email' placeholder='Email' />
        <input type='password' name='password' ref='password' placeholder='Password' />
        <button type='submit' onClick={ this.handleSubmit }>{ authType }</button>
      </form>
    )
  }
};

const mapStateToProps = (state) => {
  return { user: state.auth.get('user') };
};

export default connect(mapStateToProps)(AuthForm);
