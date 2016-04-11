import axios from 'axios';

export function fetchLogEvents(datum) {
  return {
    type:    'FETCH_LOG_EVENTS',
    promise: axios.get(`api/logEvents/${datum}`)
  };
}

export function changeDate(datum, timezone, alteration) {
  return { type: 'CHANGE_DATUM', datum, alteration, timezone };
}
