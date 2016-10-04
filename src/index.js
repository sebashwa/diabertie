import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import bearBertie from './bertie';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, (err) => {
  if (err) console.log('Could not connect to mongodb.');
});

const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });
bearBertie(bot);
