/* eslint-disable camelcase */

import { detectValues, connectBot } from './actions';

const opts = { parse_mode: 'Markdown'};

export default (bot) => {
  bot.onText(/\/start (.+)/, (msg, match) => {
    const telegramToken = match[1];

    connectBot(telegramToken, msg.from).then((text) => {
      bot.sendMessage(msg.from.id, text, { ... opts });
    });
  });

  bot.onText(/^.*\w.*\s.*\w.*$/, async (msg) => {
    const { errors, messages, warnings, data } = await detectValues(msg.text);
    const sendMessages = async (msgs) => (
      await Promise.all(msgs.map(m => bot.sendMessage(msg.from.id, m, { ... opts })))
    );

    if (errors) return sendMessages(errors);

    await sendMessages(warnings);
    await sendMessages(messages.slice(0, -1));

    const confirm = await bot.sendMessage(msg.from.id, messages.slice(-1)[0],
      { ... opts, reply_markup: { force_reply: true } });

    bot.onReplyToMessage(confirm.chat.id, confirm.message_id, (msg) => {
      if (msg.text == 'y') {
         // storeEvents(data);
        console.log('data: ', data);
        bot.sendMessage(msg.from.id, 'Awesome, I saved your data.\nYou can check it out at diabertie.com', { ... opts });
      } else if (msg.text == 'n') {
        bot.sendMessage(msg.from.id, 'Ok, try again!');
      };
    });

  });
};
