import moment from 'moment-timezone';
import { Reminder } from '../../../../models';
import { btnFactory } from '../../helpers';
import { listDailyForDeletion } from './helpers/remindersFormatter';
import polyglot from '../../../polyglot';

export default async (_, user) => {
  const p = polyglot(user.locale);

  const reminders = await Reminder.find({ user: user.id, type: 'daily' });

  const data = reminders.reduce((p, c, i) => { p[i+1] = c.id; return p; }, {});
  const detectedAt = moment().unix();
  await user.update({ latestDetectedData: { data, detectedAt } });

  const delButtons = reminders.map((_, i) => btnFactory.reminders.delDaily(i + 1, detectedAt));
  const buttons = [[btnFactory.reminders.back(p, 'mngDaily')], delButtons];

  const remindersList = listDailyForDeletion(reminders, user.timezone);
  const message = ['reminders.delDaily.list', { remindersList }];

  return { message, buttons };
};
