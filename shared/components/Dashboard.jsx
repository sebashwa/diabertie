import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchDataPoints } from 'actions/Data';

export default class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
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
                <p>Hey { user.email }! This is your data</p>
                <a onClick={ this.handleLogout }>Logout</a>
              </div>
            :
              <p>LOADING...</p>
          }
        </div>
    );
  }
}
