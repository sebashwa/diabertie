import { Reminder, User } from '../models';
import { bot } from '..';
import moment from 'moment-timezone';
import randomizeText from '../bertie/polyglot/randomizeText';

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
    const text = randomizeText(user.locale, `reminders.messages.daily.${reminderType}`, { text: reminder.text });

    bot.sendMessage(user.telegramId, text, { parse_mode: 'Markdown' });

    return await reminder.update({ lastExecutedAt: now.toDate() });
  }));

  done();
};
