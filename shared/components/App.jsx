import React, { Component , PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import LoadingBertie from 'components/global/LoadingBertie';
import Logbook from './Logbook';

import { logout, getUser } from 'actions/AuthActions';
import { fetchLogEvents } from 'actions/LogbookActions';

class App extends Component {
  static propTypes = {
    loadingUser:      PropTypes.bool,
    loadingLogEvents: PropTypes.bool,
    user:             PropTypes.object,
    logEvents:        PropTypes.object,
    botName:          PropTypes.string.isRequired,
    dispatch:         PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const { dispatch, user } = this.props;
    if (!user) { dispatch(getUser()); }
    dispatch(fetchLogEvents());
  }

  componentWillReceiveProps = (nextProps) => {
    const { user, loadingUser } = nextProps;
    if (!user && !loadingUser) { browserHistory.push('/login'); }
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    const { user,loadingUser, botName, loadingLogEvents, logEvents } = this.props;

    return (
        <div className="app">
          {
            (!!user && !loadingUser && !loadingLogEvents) ?
              <div className="app">
                <p>Hey { user.get('email') }! This is your data</p>
                <a onClick={ this.handleLogout }>Logout</a>
                <a href={ `http://telegram.me/${botName}?start=${user.get('telegramToken')}` } target="_blank">Connect</a>

                <Logbook logEvents={ logEvents } />
              </div>
            :
              <LoadingBertie />
          }
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user:             state.auth.get('user'),
    loadingUser:      state.auth.get('loadingUser'),
    botName:          state.settings.get('botName'),
    loadingLogEvents: state.logbook.get('loadingLogEvents'),
    logEvents:        state.logbook.get('logEvents')
  };
};

export default connect(mapStateToProps)(App);
