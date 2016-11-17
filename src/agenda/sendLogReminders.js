import { Reminder, User, LogEvent } from '../models';
import { bot } from '..';
import moment from 'moment-timezone';
import randomizeText from '../bertie/polyglot/randomizeText';
import { logReminderTimes, logReminderTypes } from '../constants/reminders';

const { MORNING, AFTERNOON, EVENING } = logReminderTypes;
const START_OF_DAY = { hours: 0, minutes: 0 };

async function sendIfNeeded(type, startTime, user)  {
  const start = moment.tz(startTime, user.timezone).toDate();
  const end = moment.tz(logReminderTimes[type], user.timezone).toDate();
  const logEvents = await LogEvent.find({ user: user.id, createdAt: { $lt: end, $gt: start } });

  if (logEvents.length == 0) {
    var polyglotPath = 'reminders.messages.log.';
    polyglotPath += (type == EVENING && startTime == START_OF_DAY) ? 'withoutLogEvents' : 'withLogEvents';

    const text = randomizeText(user.locale, polyglotPath, { daytime: type });
    bot.sendMessage(user.telegramId, text, { parse_mode: 'Markdown' });
    return true;
  }

  return false;
}

export default async (_, done) => {
  const now = moment.utc();
  const nowMin = now.hours() * 60 + now.minutes();

  const reminders = await Reminder.find({
    type:           'log',
    atMinute:       { $gt: nowMin - 15, $lt: nowMin + 15 },
    lastExecutedAt: { $lt: now.startOf('day').toDate() },
  });

  await Promise.all(reminders.map(async (reminder) => {
    const user = await User.findById(reminder.user);

    switch (reminder.text) {
      case MORNING: {
        await sendIfNeeded(MORNING, START_OF_DAY, user);
        break;
      }
      case AFTERNOON: {
        await sendIfNeeded(AFTERNOON, logReminderTimes[MORNING], user);
        break;
      }
      case EVENING: {
        const noLogsToday = await sendIfNeeded(EVENING, START_OF_DAY, user);
        if(!noLogsToday) { await sendIfNeeded(EVENING, logReminderTimes[AFTERNOON], user); };
        break;
      }
    }

    return await reminder.update({ lastExecutedAt: now.toDate() });
  }));

  done();
};
