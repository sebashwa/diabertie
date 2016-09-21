import express from 'express';
import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import bearBertie from './bertie';

mongoose.connect(process.env.MONGO_DB_URL, (err) => {
  if (err) console.log('Could not connect to mongodb.');
});

const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });
bearBertie(bot);

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('--> Serving app from: ' + PORT);
});
