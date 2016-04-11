import React, { Component , PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import LoadingBertie from 'components/global/LoadingBertie';
import Logbook from './Logbook';
import Introduction from './Introduction';

import { logout, getUser } from 'actions/AuthActions';

class App extends Component {
  static propTypes = {
    loadingUser: PropTypes.bool,
    user:        PropTypes.object,
    botName:     PropTypes.string.isRequired,
    dispatch:    PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const { dispatch, user } = this.props;
    if (!user) { dispatch(getUser()); }
  }

  componentWillReceiveProps = (nextProps) => {
    const { user, loadingUser } = nextProps;
    if (!user && !loadingUser) { browserHistory.push('/login'); }
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    const { user, loadingUser, botName } = this.props;

    if (user && !loadingUser) {
      return (
        <div className="app">
          <a onClick={ this.handleLogout }>Logout</a>
          { user.get('telegramId') ?
              <Logbook user={ user } /> :
              <Introduction user={ user } botName={ botName } /> }
        </div>
      );
    } else { return <LoadingBertie />; }
  }
}

const mapStateToProps = (state) => {
  return {
    user:        state.auth.get('user'),
    loadingUser: state.auth.get('loadingUser'),
    botName:     state.settings.get('botName'),
  };
};

export default connect(mapStateToProps)(App);
