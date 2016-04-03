import { Map } from 'immutable';
import { browserHistory } from 'react-router';

export default function authReducer(state = Map(), action) {
  switch(action.type) {
    case 'SIGNUP_REQUEST':
    case 'LOGIN_REQUEST':
    case 'GET_USER_REQUEST':
      return state.set('loadingUser', true);
    case 'SIGNUP':
    case 'LOGIN':
    case 'GET_USER':
      return state.merge({ user: action.res.data, loadingUser: false});
    case 'GET_USER_FAILURE':
      return state.set('loadingUser', false);
    case 'LOGOUT':
      browserHistory.push('/landing');
      return state.set('user', null);
    default:
      return state;
  }
}
