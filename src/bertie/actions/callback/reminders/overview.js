import { btnFactory } from '../../helpers';
import polyglot from '../../../polyglot';
import { Reminder } from '../../../../models';
import { formatLogReminders, formatDailyReminders } from './helpers/remindersFormatter';


export default async (_, user) => {
  const p = polyglot(user.locale);

  const reminders = await Reminder.find({ user: user.id });
  const logReminders = reminders.filter((r) => (r.type == 'log'));
  const dailyReminders = reminders.filter((r) => (r.type == 'daily'));

  const logRemindersString = !logReminders.length ? p.t('reminders.noReminders') : formatLogReminders(logReminders, p);
  const dailyRemindersString = !dailyReminders.length ? p.t('reminders.noReminders') : formatDailyReminders(dailyReminders);

  const message = ['reminders.overview', { dailyRemindersString, logRemindersString }];

  const { manageLogReminders, manageDailyReminders } = btnFactory.reminders;
  const buttons = [[manageLogReminders(p)], [manageDailyReminders(p)]];

  return { message, buttons };
};
