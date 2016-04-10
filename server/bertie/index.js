/* eslint-disable camelcase */

import { bertieDetect, bertieConnect, saveEvents } from './actions';

const opts = { parse_mode: 'Markdown'};

export default (bot) => {
  bot.onText(/\/start (.+)/, async (msg, match) => {
    const telegramToken = match[1];
    const text = await bertieConnect(telegramToken, msg.from);

    bot.sendMessage(msg.from.id, text, { ... opts });
  });

  bot.onText(/^(?!\/).*\w.*\s.*\w.*$/, async (msg) => {
    const { from, text } = msg;
    const sendMessages = async (msgs) => (
      await Promise.all(msgs.map(m => bot.sendMessage(from.id, m, { ... opts })))
    );

    const { errors, messages, warnings, data } = await bertieDetect(text);

    if (errors) return sendMessages(errors);

    await sendMessages(warnings);
    await sendMessages(messages.slice(0, -1));

    const { message_id, chat } = await bot.sendMessage(
      from.id,
      messages.slice(-1)[0],
      { ... opts, reply_markup: { force_reply: true } }
    );

    bot.onReplyToMessage(chat.id, message_id, async (msg) => {
      const { text, from } = msg;

      if (text == 'y') {
        const reply = await saveEvents(data, from.id);
        bot.sendMessage(from.id, reply, { ... opts });
      } else if (text == 'n') {
        bot.sendMessage(from.id, `Ok, I'm not doing anything!`);
      };
    });
  });
};
