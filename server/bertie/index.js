import { connectBot } from './actions';

export default (bot) => {
  bot.onText(/\/start (.+)/, (msg, match) => {
    const telegramId = msg.from.id;
    const telegramToken = match[1];

    connectBot(telegramToken, telegramId).then((text) => {
      bot.sendMessage(telegramId, text);
    });
  });
};
