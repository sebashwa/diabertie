/* eslint-disable camelcase */

import { bertieDetect, bertieStart, fetchUser, saveLatestChatAction, executeLatestChatAction } from './actions';
import polyglot from './polyglot';

const opts = { parse_mode: 'Markdown'};

export default (bot) => {
  bot.onText(/\/start (.+)/, async ({ from }) => {
    const p = polyglot();

    const text = await bertieStart(from);

    bot.sendMessage(from.id, p.t(...text), { ... opts });
  });

  bot.onText(/^(?!\/)\D*$/, async (msg) => {
    const { text, from } = msg;
    const sendMessage = (msg) => bot.sendMessage(from.id, msg, { ... opts });

    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(polyglot().t(...userError)); }

    const p = polyglot(user.locale);
    const positiveTokens = p.t('onText.positiveTokens').split(',');
    const negativeTokens = p.t('onText.negativeTokens').split(',');
    const lower = text.toLowerCase();

    if (positiveTokens.indexOf(lower) != -1) {
      const { error, message } = await executeLatestChatAction(user);
      if (error) return sendMessage(p.t(...error));

      sendMessage(p.t(...message));
    } else if (negativeTokens.indexOf(lower) != -1) {
      await saveLatestChatAction(null, null, user);
      sendMessage(p.t('onText.negativeAnswer'));
    } else {
      sendMessage(p.t('onText.notUnderstood'));
    }
  });

  bot.onText(/^(?!\/).*\d.*\s.*[A-Za-z].*$/, async (msg) => {
    const { from, text } = msg;
    const sendMessage = async (msg) => {
      await bot.sendMessage(from.id, msg, { ... opts });
    };

    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(polyglot().t(...userError)); }

    const p = polyglot(user.locale);

    const { error: detectionError, message, warnings, data } = await bertieDetect(text, p);
    if (detectionError) return sendMessage(p.t(...detectionError));

    const { error } = await saveLatestChatAction('saveLogEvents', data, user);
    if (error) { return sendMessage(p.t(...error)); }

    for(let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      await sendMessage(p.t(...warning));
    }

    bot.sendMessage(from.id, p.t(...message), {
      ... opts,
      reply_markup: {
        keyboard:          [['Yes'], ['No']],
        one_time_keyboard: true,
        resize_keyoard:    true
      }
    });
  });
};
