import moment from 'moment-timezone';
import polyglot from '../../polyglot';
import { Reminder } from '../../../models';
import { btnFactory } from '../helpers';

function zeroPadded(number) {
  return (`${number}`.length == 1) ? `0${number}` : `${number}`;
}

export default async (msg, user) => {
  try {
    const regEx = /(\d{1,2})\:(\d{1,2})\s*(.*)/;
    const match = regEx.exec(msg);

    if (!match) { return { message: ['reminders.addDaily.regExFailure'] }; };

    const hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const text = match[3];

    const lastExecutedAt = moment.utc().subtract(1, 'days').toDate();
    await Reminder.addReminder({ hour, minute }, 'daily', text, user, lastExecutedAt);
    await user.update({ latestDetectedData: { data: null, detectedAt: null } });

    const message = ['reminders.addDaily.success', { hours: zeroPadded(hour), minutes: zeroPadded(minute), text }];
    const buttons = [[btnFactory.reminders.manageDaily(polyglot(user.locale))]];

    return { message, buttons };
  } catch (e) {
    console.log(e);
    return { message: ['generalErrors.superWrong'] };
  }
};
