import { bertieStart } from './actions';
import { btnFactory, timeline } from './actions/helpers';
import { detectLogEvents } from './actions/parsing';
import { fetchLogEvents, fetchUser } from './actions/database';
import callbackActions from './actions/callback';

import polyglot from './polyglot';
import moment from 'moment-timezone';

export default (bot) => {
  const defaultOpts = { parse_mode: 'Markdown'};
  const sendMessage = (fromId, msg, opts = defaultOpts) => bot.sendMessage(fromId, msg, opts);

  bot.onText(/\/start.*$/, async ({ from }) => {
    const p = polyglot();
    const text = await bertieStart(from);

    sendMessage(from.id, p.t(...text));
  });

  bot.onText(/\/help/, async ({ from }) => {
    const { user } = await fetchUser(from);
    const locale = user ? user.locale : 'en';
    const p = polyglot(locale);

    sendMessage(from.id, p.t('help'));
  });

  bot.onText(/\/diary/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const tl = timeline(user);

    const { message, error } = await fetchLogEvents(user, tl.moment.today);
    if (error) { return sendMessage(from.id, p.t(...error)); };

    sendMessage(from.id, message, {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: [[ btnFactory.navigateDiary.back(tl.str.prevDay) ]]
      }
    });
  });

  bot.onText(/\/deletion/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const tl = timeline(user);

    // This is a 'feature toggle', remove it when deletion works
    return sendMessage(from.id, p.t('onText.notUnderstood'));

    const { message, error } = await fetchLogEvents(user, tl.moment.today);
    if (error) { return sendMessage(from.id, p.t(...error)); };

    const text = `${p.t('deletion.selectDate')}${message}`;

    sendMessage(from.id, text, {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: [
          [ btnFactory.deletion.back(tl.str.prevDay) ],
          [ btnFactory.deletion.select(tl.str.today) ]
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
