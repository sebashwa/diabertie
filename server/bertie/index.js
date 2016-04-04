/* eslint-disable camelcase */

import { detectValues, connectBot } from './actions';

export default (bot) => {
  bot.onText(/\/start (.+)/, (msg, match) => {
    const telegramToken = match[1];

    connectBot(telegramToken, msg.from).then((text) => {
      bot.sendMessage(msg.from.id, text, { parse_mode: 'Markdown' });
    });
  });

  bot.onText(/^(?!\/).*$/, (msg) => {
    detectValues(msg).then((text) => {
      bot.sendMessage(msg.from.id, text, { parse_mode: 'Markdown' });
    });
  });
};
