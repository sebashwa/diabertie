import React, { Component , PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import polyglot from 'lib/polyglot';

import Logbook from './Logbook';
import Introduction from './Introduction';
import Modal from 'components/global/Modal';

import { logout, getUser } from 'actions/AuthActions';

class App extends Component {
  static propTypes = {
    loadingUser: PropTypes.bool,
    user:        PropTypes.object,
    botName:     PropTypes.string.isRequired,
    dispatch:    PropTypes.func.isRequired,
    p:           PropTypes.object
  };

  componentWillMount = () => {
    const { dispatch, user } = this.props;
    if (!user) { dispatch(getUser()); }
  }

  componentWillReceiveProps = (nextProps) => {
    const { user, loadingUser } = nextProps;
    if (!user && !loadingUser) { browserHistory.push('/landing'); }
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    const { user, loadingUser, botName } = this.props;

    if (user && !loadingUser) {
      const p = polyglot(user.get('locale'));
      return (
        <div className="app">
          <a onClick={ this.handleLogout }>{ p.t('App.logout') }</a>
          { user.get('telegramId') ?
              <Logbook user={ user } /> :
              <Introduction user={ user } botName={ botName } /> }
        </div>
      );
    } else { return <Modal><div>{"LOADING..."}</div></Modal>; }
  }
}

const mapStateToProps = (state) => {
  const { user, loadingUser } = state.auth.toObject();
  const { botName } = state.settings.toObject();

  return { user, loadingUser, botName };
};

export default connect(mapStateToProps)(App);
