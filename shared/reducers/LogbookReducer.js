import { Map } from 'immutable';

export default (state = Map(), action) => {
  switch(action.type) {
    case 'FETCH_LOG_EVENTS_REQUEST':
      return state.set('loadingLogEvents', true);
    case 'FETCH_LOG_EVENTS':
      return state.merge({ loadingLogEvents: false, logEvents: action.res.data });
    default:
      return state;
  }
};
