import { Reminder } from '../../../../models';
import { btnFactory } from '../../helpers';
import { formatDailyReminders } from './helpers/remindersFormatter';
import polyglot from '../../../polyglot';

export default async (_, user) => {
  const p = polyglot(user.locale);

  await user.update({ latestDetectedData: { data: null, detectedAt: null } });

  const reminders = await Reminder.find({ type: 'daily', user: user.id });

  const buttons = [[btnFactory.reminders.back(p, 'overview')]];

  if (reminders.length <= 8) { buttons.push([btnFactory.reminders.addDaily(p)]); };
  if (reminders.length > 0) { buttons.push([btnFactory.reminders.delDaily(p)]); };

  const remindersList = reminders.length ? formatDailyReminders(reminders, user.timezone) : p.t('reminders.noReminders');
  const message = ['reminders.manageDaily.list', { remindersList }];

  return { message, buttons };
};
