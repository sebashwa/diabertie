import { btnFactory } from '../../helpers';
import polyglot from '../../../polyglot';
import { Reminder } from '../../../../models';
import { formatLogReminders, formatDailyReminders } from './helpers/remindersFormatter';


export default async (_, user) => {
  const p = polyglot(user.locale);

  const reminders = await Reminder.find({ user: user.id });
  const logReminders = reminders.filter((r) => (r.type == 'log'));
  const dailyReminders = reminders.filter((r) => (r.type == 'daily'));

  const logRemindersString = !logReminders.length ? p.t('reminders.noReminders') : formatLogReminders(logReminders, p, user.timezone);
  const dailyRemindersString = !dailyReminders.length ? p.t('reminders.noReminders') : formatDailyReminders(dailyReminders, user.timezone);

  const message = ['reminders.overview', { dailyRemindersString, logRemindersString }];

  const { manageLog, manageDaily } = btnFactory.reminders;
  const buttons = [[manageLog(p)], [manageDaily(p)]];

  return { message, buttons };
};
