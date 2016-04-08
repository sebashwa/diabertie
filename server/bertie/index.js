/* eslint-disable camelcase */

import { detectValues, connectBot, saveEvents } from './actions';

const opts = { parse_mode: 'Markdown'};

export default (bot) => {
  bot.onText(/\/start (.+)/, async (msg, match) => {
    const telegramToken = match[1];
    const text = await connectBot(telegramToken, msg.from);

    bot.sendMessage(msg.from.id, text, { ... opts });
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
      const { text, from } = msg;

      if (text == 'y') {
        const reply = saveEvents(data, from.id);
        bot.sendMessage(from.id, reply, { ... opts });
      } else if (text == 'n') {
        bot.sendMessage(from.id, `Ok, I'm not doing anything!`);
      };
    });
  });
};
