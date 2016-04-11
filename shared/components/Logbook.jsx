import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoadingBertie from 'components/global/LoadingBertie';
import LogbookData from 'components/LogbookData';
import LogbookNavigation from 'components/LogbookNavigation';

import { fetchLogEvents } from 'actions/LogbookActions';

class Logbook extends Component {
  static propTypes = {
    user:             PropTypes.object.isRequired,
    logEvents:        PropTypes.object,
    loadingLogEvents: PropTypes.bool,
    dispatch:         PropTypes.func.isRequired
  };

  componentWillMount = () => {
    this.props.dispatch(fetchLogEvents());
  }

  render() {
    const { logEvents, loadingLogEvents } = this.props;

    return (
      <div className="logbook">
        <LogbookNavigation />
        { loadingLogEvents ? <LoadingBertie /> : null }
        { !!logEvents && !loadingLogEvents ? <LogbookData logEvents={ logEvents } /> : null }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    logEvents:        state.logbook.get('logEvents'),
    loadingLogEvents: state.logbook.get('loadingLogEvents'),
  };
};

export default connect(mapStateToProps)(Logbook);
