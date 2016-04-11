import axios from 'axios';
import moment from 'moment-timezone';

export function fetchLogEvents() {
  const datum = moment().format('MM-DD-YYYY');
  return {
    type:    'FETCH_LOG_EVENTS',
    promise: axios.get(`api/logEvents/${datum}`)
  };
}
