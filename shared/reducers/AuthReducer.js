import { Map } from 'immutable';
import { browserHistory } from 'react-router';

export default function AuthReducer(state = Map(), action) {
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
      const error = (action.error.data.name == 'UserExistsError') ?
        { user: ['already exists'] } : null;

      return state.merge({ formErrors: error });
    case 'GET_USER_FAILURE':
      return state.set('loadingUser', false);
    case 'LOGOUT':
      browserHistory.push('/landing');
      return state.set('user', null);
    case 'CLEAR_AUTH_FORM_ERRORS':
      return state.set('formErrors', null);
    default:
      return state;
  }
}
