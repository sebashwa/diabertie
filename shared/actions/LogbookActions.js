import axios from 'axios';

export function fetchLogEvents(datum) {
  return {
    type:    'FETCH_LOG_EVENTS',
    promise: axios.get(`api/logEvents/${datum.format('MM-DD-YYYY')}`)
  };
}

export function changeDate(datum, alteration) {
  return { type: 'CHANGE_DATUM', datum, alteration };
}
