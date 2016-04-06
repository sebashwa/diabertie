import { Map } from 'immutable';

export default function SettingsReducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_BOT_NAME':
      return state.set('botName', action.botName);
    default:
      return state;
  }
}
