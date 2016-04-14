/* eslint-disable camelcase */

import { bertieDetect, bertieConnect, saveLatestChatAction, executeLatestChatAction } from './actions';

const opts = { parse_mode: 'Markdown'};

export default (bot) => {
  bot.onText(/\/start (.+)/, async (msg, match) => {
    const telegramToken = match[1];
    const text = await bertieConnect(telegramToken, msg.from);

    bot.sendMessage(msg.from.id, text, { ... opts });
  });

  bot.onText(/^(?!\/)\D*$/, async (msg) => {
    const { text, from } = msg;
    const sendMessage = (msg) => bot.sendMessage(from.id, msg, { ... opts });

    if (text == 'Yes') {
      const { error, message } = await executeLatestChatAction(from);
      if (error) return sendMessage(error);

      sendMessage(message);
    } else if (text == 'No') {
      await saveLatestChatAction(null, null, from);
      sendMessage('Ok, I\'m not doing anything!');
    } else {
      sendMessage('Oh sorry, I didn\'t get that..');
    };
  });

  bot.onText(/^(?!\/).*\d.*\s.*\w.*$/, async (msg) => {
    const { from, text } = msg;
    const sendMessage = async (msg) => {
      await bot.sendMessage(from.id, msg, { ... opts });
    };

    const { error: detectionError, message, warnings, data } = await bertieDetect(text);
    if (detectionError) return sendMessage(detectionError);

    const { error: saveLatestChatActionError } = await saveLatestChatAction('saveLogEvents', data, from);
    if (saveLatestChatActionError) { return sendMessage(saveLatestChatActionError); }

    for(let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      await sendMessage(warning);
    }

    bot.sendMessage(from.id, message, {
      ... opts, reply_markup: {
        keyboard:          [['Yes'], ['No']], 
        one_time_keyboard: true,
        resize_keyoard:    true
      }
    });
  });
};
