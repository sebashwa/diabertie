import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import polyglot from 'lib/polyglot';

import LoadingBertie from 'components/global/LoadingBertie';
import LogbookData from 'components/LogbookData';
import LogbookNavigation from 'components/LogbookNavigation';

import { fetchLogEvents } from 'actions/LogbookActions';

class Logbook extends Component {
  static propTypes = {
    user:             PropTypes.object.isRequired,
    datum:            PropTypes.object,
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

    if (datum.unix() !== nextDatum.unix()) { dispatch(fetchLogEvents(nextDatum)); }
  }

  render() {
    const { user, logEvents, loadingLogEvents, datum } = this.props;
    const p = polyglot(user.get('locale'));

    return (
      <div className="logbook">
        <LogbookNavigation datum={ datum } p={ p } />
        { !!loadingLogEvents && <LoadingBertie /> }
        { 
          (!!logEvents && !loadingLogEvents) &&
          <LogbookData logEvents={ logEvents } user={ user } p={ p } />
        }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  const timezone = props.user.get('timezone');

  return {
    logEvents:        state.logbook.get('logEvents'),
    loadingLogEvents: state.logbook.get('loadingLogEvents'),
    datum:            state.logbook.get('datum') || moment().tz(timezone)
  };
};

export default connect(mapStateToProps)(Logbook);
