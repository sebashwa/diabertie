import { bertieStart, btnFactory } from './actions';
import { detectLogEvents } from './actions/parsing';
import { fetchLogEvents, fetchUser } from './actions/database';
import callbackActions from './actions/callback';

import polyglot from './polyglot';
import moment from 'moment-timezone';

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
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const today = moment.utc().tz(user.timezone);

    const { message, error } = await fetchLogEvents(user, today);
    if (error) { return sendMessage(from.id, p.t(...error)); };

    const prevDay = today.clone().subtract(1, 'days').format('YYYY-MM-DD');

    sendMessage(from.id, message, {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: [[ btnFactory.navigateDiary.back(prevDay) ]]
      }
    });
  });

  bot.onText(/\/deletion/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);

    // This is a 'feature toggle', remove it when deletion works
    return sendMessage(from.id, p.t('onText.notUnderstood'));

    const today = moment.utc().tz(user.timezone);
    const prevDay = today.clone().subtract(1, 'days').format('YYYY-MM-DD');

    const { message, error } = await fetchLogEvents(user, today);
    if (error) { return sendMessage(from.id, p.t(...error)); };

    const text = `${p.t('deletion.selectDate')}${message}`;

    sendMessage(from.id, text, {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: [
          [ btnFactory.deletion.back(prevDay) ],
          [ btnFactory.deletion.select(today.format('YYYY-MM-DD')) ]
        ]
      }
    });
  });

  bot.onText(/^(?!\/)\D*$/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }

    const p = polyglot(user.locale);
    sendMessage(from.id, p.t('onText.notUnderstood'));
  });

  bot.onText(/^(?!\/).*\d.*\s.*[A-Za-z].*$/, async ({ from, text }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }

    const p = polyglot(user.locale);

    const { error: detectionError, message, warnings, data } = await detectLogEvents(text, p);
    if (detectionError) return sendMessage(from.id, p.t(...detectionError));

    for(let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      await sendMessage(from.id, p.t(...warning));
    }

    const detectedAt = moment().format();
    await user.update({ latestDetectedData: { detectedAt, data } });

    sendMessage(from.id, p.t(...message), {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: [
          [ btnFactory.saveLogEvents.yes(detectedAt), btnFactory.saveLogEvents.no() ]
        ]
      }
    });
  });

  bot.on('callback_query', async ({ from, data, message: originalMsg }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const callbackData = JSON.parse(data);

    const { message, buttons } = await callbackActions[callbackData.type](callbackData, user, p, originalMsg);

    const messageOpts = {
      ...defaultOpts,
      chat_id:    originalMsg.chat.id,
      message_id: originalMsg.message_id,
    };

    if (buttons) {
      messageOpts.reply_markup = { inline_keyboard: buttons };
    }

    bot.editMessageText(message, messageOpts);
  });
};
