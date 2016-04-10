import axios from 'axios';

export function fetchLogEvents() {
  return {
    type:    'FETCH_LOG_EVENTS',
    promise: axios.get('api/events/04-09-2016')
  };
}
