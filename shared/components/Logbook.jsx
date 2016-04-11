import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import LoadingBertie from 'components/global/LoadingBertie';
import LogbookData from 'components/LogbookData';
import LogbookNavigation from 'components/LogbookNavigation';

import { fetchLogEvents } from 'actions/LogbookActions';

class Logbook extends Component {
  static propTypes = {
    user:             PropTypes.object.isRequired,
    timezone:         PropTypes.string.isRequired,
    datum:            PropTypes.string,
    logEvents:        PropTypes.object,
    loadingLogEvents: PropTypes.bool,
    dispatch:         PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const { dispatch, datum } = this.props;
    dispatch(fetchLogEvents(datum));
  }

  componentWillReceiveProps = (nextProps) => {
    const { datum, dispatch } = this.props;
    const nextDatum = nextProps.datum;
    if (datum != nextDatum) dispatch(fetchLogEvents(nextDatum));
  }

  render() {
    const { logEvents, loadingLogEvents, timezone, datum } = this.props;

    return (
      <div className="logbook">
        <LogbookNavigation datum={ datum } timezone={ timezone }/>
        { loadingLogEvents ? <LoadingBertie /> : null }
        { !!logEvents && !loadingLogEvents ? <LogbookData logEvents={ logEvents } timezone={ timezone } /> : null }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  const timezone = props.user.get('timezone');

  return {
    logEvents:        state.logbook.get('logEvents'),
    loadingLogEvents: state.logbook.get('loadingLogEvents'),
    datum:            state.logbook.get('datum') || moment().tz(timezone).format('MM-DD-YYYY'),
    timezone
  };
};

export default connect(mapStateToProps)(Logbook);
