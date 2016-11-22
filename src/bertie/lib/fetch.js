import nodeFetch from 'node-fetch';

export function fetch(url, cb) {
  return nodeFetch(url, cb);
}
