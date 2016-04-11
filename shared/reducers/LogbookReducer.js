import { Map } from 'immutable';
import moment from 'moment-timezone';

export default (state = Map(), action) => {
  switch(action.type) {
    case 'FETCH_LOG_EVENTS_REQUEST':
      return state.set('loadingLogEvents', true);
    case 'FETCH_LOG_EVENTS':
      return state.merge({ loadingLogEvents: false, logEvents: action.res.data });
    case 'FETCH_LOG_EVENTS_FAILURE':
      return state.set('loadingLogEvents', false);
    case 'CHANGE_DATUM':
      const { datum, timezone, alteration } = action;
      const newDatum = moment(datum, 'MM-DD-YYYY')
        .tz(timezone).add(alteration, 'day').format('MM-DD-YYYY');

      return state.set('datum', newDatum);
    default:
      return state;
  }
};
