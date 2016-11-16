import { bertieStart, listShorthands } from './actions';
import { btnFactory, timeline } from './actions/helpers';
import { detectLogEvents } from './actions/parsing';
import { fetchUser } from './actions/database';
import callbackActions from './actions/callback';
import conversationalActions from './actions/conversational';

import polyglot from './polyglot';
import moment from 'moment-timezone';

export default (bot) => {
  const defaultOpts = { parse_mode: 'Markdown'};
  const sendMessage = (fromId, msg, opts = defaultOpts) => bot.sendMessage(fromId, msg, opts);

  bot.onText(/^\/start.*$/, async ({ from }) => {
    const p = polyglot();
    const text = await bertieStart(from);

    sendMessage(from.id, p.t(...text));
  });

  bot.onText(/^\/help/, async ({ from }) => {
    const { user } = await fetchUser(from);
    const locale = user ? user.locale : 'en';
    const p = polyglot(locale);

    sendMessage(from.id, p.t('help'));
  });

  bot.onText(/^\/timezone/, async ({ from }) => {
    const { user } = await fetchUser(from);
    const p = polyglot(user.locale);

    const detectedAt = moment().unix();

    sendMessage(from.id, p.t('setTimezone.askForChange', { timezone: user.timezone }), {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: [
          [ btnFactory.setTimezone.yes(detectedAt, p), btnFactory.setTimezone.no(p) ]
        ]
      }
    });
  });

  bot.onText(/^\/shorthands/, async ({ from }) => {
    const { user } = await fetchUser(from);
    const p = polyglot(user.locale);

    const { message } = listShorthands(p);
    sendMessage(from.id, p.t(...message));
  });

  bot.onText(/^\/diary/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const tl = timeline(user);

    const { message, buttons } = await callbackActions.navigateDiary({ d: tl.moment.today.unix() }, user);

    const opts = { ...defaultOpts };
    if (buttons) { opts.reply_markup = { inline_keyboard: buttons }; };

    sendMessage(from.id, p.t(...message), opts);
  });

  bot.onText(/^\/deletion/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const tl = timeline(user);

    const { message, buttons } = await callbackActions.del({ d: tl.unix.today, s: 'selDate' }, user);

    sendMessage(from.id, p.t(...message), {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: buttons
      }
    });
  });

  bot.onText(/^\/notes/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const tl = timeline(user);

    const { message, buttons } = await callbackActions.notes({ d: tl.unix.today, s: 'selDate' }, user);

    sendMessage(from.id, p.t(...message), { ... defaultOpts, reply_markup: { inline_keyboard: buttons } });
  });

  bot.onText(/^\/reminderz/, async ({ from }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);

    const { message, buttons } = await callbackActions.reminders({ s: 'overview' }, user);

    sendMessage(from.id, p.t(...message), { ... defaultOpts, reply_markup: { inline_keyboard: buttons } });
  });

  bot.onText(/^(?!\/).*$/, async ({ from, text }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);

    const { data: latestDetected } = user.latestDetectedData;
    if (latestDetected && conversationalActions[latestDetected.type]) {
      const { message: conversationalMessage, buttons } = await conversationalActions[latestDetected.type](text, user);
      const opts = { ... defaultOpts };
      if (buttons) { opts.reply_markup = { inline_keyboard: buttons }; };
      return sendMessage(from.id, p.t(...conversationalMessage), opts);
    }

    const { error: detectionError, message, warnings, data } = await detectLogEvents(text, p);
    if (detectionError) return sendMessage(from.id, p.t(...detectionError));

    for(let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      await sendMessage(from.id, p.t(...warning));
    }

    const detectedAt = moment().unix();
    await user.update({ latestDetectedData: { detectedAt, data } });

    sendMessage(from.id, p.t(...message), {
      ... defaultOpts,
      reply_markup: {
        inline_keyboard: [
          [ btnFactory.saveLogEvents.yes(detectedAt, p), btnFactory.saveLogEvents.no(p) ]
        ]
      }
    });
  });

  bot.on('callback_query', async ({ from, data, message: originalMsg }) => {
    const { user, error: userError } = await fetchUser(from);
    if (userError) { return sendMessage(from.id, polyglot().t(...userError)); }
    const p = polyglot(user.locale);
    const callbackData = JSON.parse(data);

    const { message, buttons } = await callbackActions[callbackData.t](callbackData, user, originalMsg);

    const opts = {
      ...defaultOpts,
      chat_id:    originalMsg.chat.id,
      message_id: originalMsg.message_id,
    };

    if (buttons) { opts.reply_markup = { inline_keyboard: buttons }; };
    bot.editMessageText(p.t(...message), opts);
  });
};
