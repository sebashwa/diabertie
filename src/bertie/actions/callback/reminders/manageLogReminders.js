import { Reminder } from '../../../../models';
import { btnFactory } from '../../helpers';
import { formatLogReminders } from './helpers/remindersFormatter';
import polyglot from '../../../polyglot';

import logReminderTypes from './logReminderTypes';
const { MORNING, AFTERNOON, EVENING } = logReminderTypes;

const reminderTimes = { morning: 660, afternoon: 900, evening: 1260 };

async function addReminder (text, user) {
  const atMinute = reminderTimes[text];
  const query = { type: 'log', user: user.id, text };
  await Reminder.findOneAndUpdate(query, {...query, atMinute }, { upsert: true });
}

export default async ({ add, del }, user) => {
  const p = polyglot(user.locale);

  if (add) { await addReminder(add, user); };
  if (del) { await Reminder.remove({ type: 'log', user: user.id, text: del }); };

  const reminders = await Reminder.find({ type: 'log', user: user.id });
  const remindersPerDaytime = reminders.reduce((p, c) => { p[c.text] = c; return p; }, {});

  const buttons = [MORNING, AFTERNOON, EVENING].map((type) => {
    const { addLogReminder, deleteLogReminder } = btnFactory.reminders;
    const r = remindersPerDaytime[type];

    if (r) { return [deleteLogReminder(p, r.text)]; }
    return [addLogReminder(p, type)];
  });

  buttons.unshift([btnFactory.reminders.backToOverview(p)]);

  const remindersList = reminders.length ? formatLogReminders(reminders, p) : p.t('reminders.noReminders');
  const message = ['reminders.manageLogReminders.list', { remindersList }];

  return { message, buttons };
};
