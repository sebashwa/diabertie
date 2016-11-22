import moment from 'moment-timezone';
import { btnFactory } from '../../helpers';
import polyglot from '../../../polyglot';

export default async (_, user) => {
  const p = polyglot(user.locale);

  const data = { type: 'addDailyReminder' };
  const detectedAt = moment().unix();
  await user.update({ latestDetectedData: { data, detectedAt } });

  const buttons = [[btnFactory.reminders.back(p, 'mngDaily')]];
  const message = ['reminders.addDaily.explanation'];

  return { message, buttons };
};
