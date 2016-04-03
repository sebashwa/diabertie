import axios from 'axios';

export function login(formData) {
  return {
    type:    'LOGIN',
    promise: axios.post('api/login', formData, { withCredentials: true })
  };
}

export function logout() {
  return {
    type:    'LOGOUT',
    promise: axios.post('api/logout', null, { withCredentials: true })
  };
}

export function signup(formData) {
  return {
    type:    'SIGNUP',
    promise: axios.post('api/signup', formData, { withCredentials: true })
  };
}

export function getUser() {
  return {
    type:    'GET_USER',
    promise: axios.get('api/users/current', { withCredentials: true })
  };
}
