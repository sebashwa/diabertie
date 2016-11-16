import { Reminder, User } from '../models';
import { bot } from '..';
import moment from 'moment-timezone';
import polyglot from '../bertie/polyglot';
import * as locales from '../bertie/polyglot/locales';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomReminder(locale, polyglotString, polyglotOpts) {
  const p = polyglot(locale);
  const pathToReminders = polyglotString.split('.');
  const reminders = pathToReminders.reduce((p, c) => (p[c]), locales[locale]);
  const max = Object.keys(reminders).length + 1;

  return p.t(`${polyglotString}.${getRandomInt(1, max)}`, polyglotOpts);
}

export default async (_, done) => {
  const now = moment.utc();
  const nowMin = now.hours() * 60 + now.minutes();

  const reminders = await Reminder.find({
    type:           'daily',
    atMinute:       { $gt: nowMin - 10, $lt: nowMin + 10 },
    lastExecutedAt: { $lt: now.startOf('day').toDate() },
  });

  await Promise.all(reminders.map(async (reminder) => {
    const user = await User.findById(reminder.user);
    const reminderType = reminder.text.length > 0 ? 'withText' : 'withoutText';
    const text = randomReminder(user.locale, `reminders.messages.daily.${reminderType}`, { text: reminder.text });

    bot.sendMessage(user.telegramId, text, { parse_mode: 'Markdown' });

    return await reminder.update({ lastExecutedAt: now.toDate() });
  }));

  done();
};
