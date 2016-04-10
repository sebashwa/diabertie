import axios from 'axios';
import moment from 'moment-timezone';

export function clearFormErrors() {
  return { type: 'CLEAR_AUTH_FORM_ERRORS' };
}

export function login(formData) {
  const data = { ...formData, timezone: moment.tz.guess() };
  return {
    type:    'LOGIN',
    promise: axios.post('api/login', data)
  };
}

export function logout() {
  return {
    type:    'LOGOUT',
    promise: axios.post('api/logout', null)
  };
}

export function signup(formData) {
  const data = { ...formData, timezone: moment.tz.guess() };
  return {
    type:    'SIGNUP',
    promise: axios.post('api/signup', data)
  };
}

export function getUser() {
  return {
    type:    'GET_USER',
    promise: axios.get('api/users/current')
  };
}
