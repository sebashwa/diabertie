import React, { Component , PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { logout, getUser } from 'actions/AuthActions';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object,
    loadingUser: PropTypes.bool
  };

  componentWillMount = () => {
    const { dispatch, user } = this.props;
    if (!user) { dispatch(getUser()) }
  }

  componentWillReceiveProps = (props) => {
    const { dispatch, user, loadingUser } = props;
    if (!user && !loadingUser) { browserHistory.push('/landing') }
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    const { user, loadingUser } = this.props;

    return (
        <div className="app">
          {
            !!user && !loadingUser ?
              <div>
                <p>Hey { user.get('email') }! This is your data</p>
                <a href={ `http://telegram.me/diabertiebot?start=${user.get('telegramToken')}` } target="_blank">Connect</a>
                <a onClick={ this.handleLogout }>Logout</a>
              </div>
            :
              <p>LOADING...</p>
          }
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.get('user'), loadingUser: state.auth.get('loadingUser') };
};

export default connect(mapStateToProps)(App);
