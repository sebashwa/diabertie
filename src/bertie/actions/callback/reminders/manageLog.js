import { Reminder } from '../../../../models';
import { btnFactory } from '../../helpers';
import { listLog } from './helpers/remindersFormatter';
import polyglot from '../../../polyglot';

import { logReminderTypes, logReminderTimes } from '../../../../constants/reminders';
const { MORNING, AFTERNOON, EVENING } = logReminderTypes;

export default async ({ add, del }, user) => {
  const p = polyglot(user.locale);

  if (add) { await Reminder.addReminder(logReminderTimes[add], 'log', add, user); };
  if (del) { await Reminder.remove({ type: 'log', user: user.id, text: del }); };

  const reminders = await Reminder.find({ type: 'log', user: user.id });
  const remindersPerDaytime = reminders.reduce((p, c) => { p[c.text] = c; return p; }, {});

  const buttons = [MORNING, AFTERNOON, EVENING].map((type) => {
    const reminderBtns = btnFactory.reminders;
    const r = remindersPerDaytime[type];

    if (r) { return [reminderBtns.delLog(p, r.text)]; }
    return [reminderBtns.addLog(p, type)];
  });

  buttons.unshift([btnFactory.reminders.back(p, 'overview')]);

  const remindersList = reminders.length ? listLog(reminders, p, user.timezone) : p.t('reminders.noReminders');
  const message = ['reminders.manageLog.list', { remindersList }];

  return { message, buttons };
};
