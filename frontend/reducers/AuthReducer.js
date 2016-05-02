import { Map } from 'immutable';
import { browserHistory } from 'react-router';

export default (state = Map(), action) => {
  switch(action.type) {
    case 'SIGNUP_REQUEST':
    case 'LOGIN_REQUEST':
    case 'GET_USER_REQUEST':
      return state.set('loadingUser', true);
    case 'SIGNUP':
    case 'LOGIN':
    case 'GET_USER':
      return state.merge({ user: action.res.data, loadingUser: false});
    case 'SIGNUP_FAILURE':
    case 'LOGIN_FAILURE':
      switch (action.error.data.name) {
        case 'UserExistsError':
          return state.setIn(['formErrors', 'user'], ['already exists']);
        case 'LoginUnsuccessful':
          return state.setIn(['formErrors', 'user'], ['credentials are invalid']);
        default:
          return state;
      }
    case 'GET_USER_FAILURE':
      return state.set('loadingUser', false);
    case 'LOGOUT':
      browserHistory.push('/landing');
      return state.set('user', null);
    case 'CLEAR_AUTH_FORM_ERRORS':
      return state.set('formErrors', null);
    case 'ADD_AUTH_FORM_ERRORS':
      const type = Object.keys(action.errors)[0];
      return state.setIn(['formErrors', type], action.errors[type]);
    default:
      return state;
  }
};
