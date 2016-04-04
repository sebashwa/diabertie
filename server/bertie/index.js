import { connectBot } from './actions';

export default (bot) => {
  bot.onText(/\/start (.+)/, (msg, match) => {
    const telegramToken = match[1];

    connectBot(telegramToken, msg.from).then((text) => {
      bot.sendMessage(msg.from.id, text);
    });
  });
};
