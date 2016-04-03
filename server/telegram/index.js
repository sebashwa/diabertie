import TelegramBot from 'node-telegram-bot-api';
import { connectBot } from './actions';

const token = process.env.TELEGRAM_API_KEY;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start (.+)/, (msg, match) => {
  const telegramId = msg.from.id;
  const telegramToken = match[1];

  connectBot(telegramToken, telegramId).then((text) => {
    bot.sendMessage(telegramId, text);
  });
});
