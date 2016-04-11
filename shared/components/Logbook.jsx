import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoadingBertie from 'components/global/LoadingBertie';

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

    if (!!logEvents && !loadingLogEvents) {
      return (
        <div className="logbook">
          { logEvents.size > 0 ?
            logEvents.map((logEvent, i) => {
            const { createdAt, originalValue, originalUnit, category } = logEvent.toObject();

            return (
              <div key={i} className="event">
                <span>{ createdAt } </span>
                <span>{ category } </span>
                <span>{ originalValue } </span>
                <span>{ originalUnit } </span>
              </div>
            );
          }) : 'NO DATA TO SEE HERE' }
        </div>
      );
    } else {
      return <LoadingBertie />;
    }
  }
};

const mapStateToProps = (state) => {
  return {
    logEvents:        state.logbook.get('logEvents'),
    loadingLogEvents: state.logbook.get('loadingLogEvents'),
  };
};

export default connect(mapStateToProps)(Logbook);
