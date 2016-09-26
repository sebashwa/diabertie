/* eslint-disable camelcase */

import { bertieDetect, bertieStart, fetchUser, fetchLogEvents, saveLatestChatAction, executeLatestChatAction } from './actions';
import polyglot from './polyglot';

export default (bot) => {
  const defaultOpts = { parse_mode: 'Markdown'};
  const sendMessage = (fromId, msg, opts = defaultOpts) => bot.sendMessage(fromId, msg, { ... opts });

  bot.onText(/\/start.*$/, async ({ from }) => {
    const p = polyglot();
    const text = await bertieStart(from);

    sendMessage(from.id, p.t(...text));
  });

  bot.onText(/\/diary/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    const p = polyglot(user.locale);

    const { message, error } = await fetchLogEvents(user);
    if (error) { return sendMessage(from.id, p.t(...error)) };

    sendMessage(from.id, message);
  });

  bot.onText(/^(?!\/)\D*$/, async (msg) => {
    const { text, from } = msg;

    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }

    const p = polyglot(user.locale);
    const positiveTokens = p.t('onText.positiveTokens').split(',');
    const negativeTokens = p.t('onText.negativeTokens').split(',');
    const lower = text.toLowerCase();

    if (positiveTokens.indexOf(lower) != -1) {
      const { error, message } = await executeLatestChatAction(user);
      if (error) return sendMessage(from.id, p.t(...error));

      sendMessage(from.id, p.t(...message));
    } else if (negativeTokens.indexOf(lower) != -1) {
      await saveLatestChatAction(null, null, user);
      sendMessage(from.id, p.t('onText.negativeAnswer'));
    } else {
      sendMessage(from.id, p.t('onText.notUnderstood'));
    }
  });

  bot.onText(/^(?!\/).*\d.*\s.*[A-Za-z].*$/, async ({ from, text }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }

    const p = polyglot(user.locale);

    const { error: detectionError, message, warnings, data } = await bertieDetect(text, p);
    if (detectionError) return sendMessage(from.id, p.t(...detectionError));

    const { error } = await saveLatestChatAction('saveLogEvents', data, user);
    if (error) { return sendMessage(from.id, p.t(...error)); }

    for(let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      await sendMessage(from.id, p.t(...warning));
    }

    sendMessage(from.id, p.t(...message), {
      ... defaultOpts,
      reply_markup: {
        keyboard:          [['Yes'], ['No']],
        one_time_keyboard: true,
        resize_keyoard:    true
      }
    });
  });
};
