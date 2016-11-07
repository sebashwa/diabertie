import polyglot from '../../polyglot';

const genBtn = (text, type, subType, data) => {
  return { text, callback_data: JSON.stringify({ t: type, s: subType, d: data }) };
};

const dP = polyglot();

export default {
  navigateDiary: {
    back:    (date) => genBtn('<<', 'navigateDiary', undefined, date),
    forward: (date) => genBtn('>>', 'navigateDiary', undefined, date),
    today:   (date, p = dP) => genBtn(p.t('dateTime.today'), 'navigateDiary', undefined, date),
  },
  deletion: {
    process: (n, at) => genBtn(`${n})`, 'del', 'delVal', { n, at }),
    select:  (date, p = dP) => genBtn(p.t('generalWords.select'), 'del', 'selVal', date),
    back:    (date) => genBtn('<<', 'del', 'selDate', date),
    forward: (date) => genBtn('>>', 'del', 'selDate', date),
    today:   (date, p = dP) => genBtn(p.t('dateTime.today'), 'del', 'selDate', date),
  },
  notes: {
    addNote: (date, p = dP) => genBtn(p.t('notes.addNote'), 'notes', 'addNote', date),
    delNote: (date, p = dP) => genBtn(p.t('notes.delNote'), 'notes', 'selNote', date),
    delete:  (n, at) => genBtn(`${n})`, 'notes', 'delNote', { n, at }),
    back:    (date) => genBtn('<<', 'notes', 'selDate', date),
    forward: (date) => genBtn('>>', 'notes', 'selDate', date),
    today:   (date, p = dP) => genBtn(p.t('dateTime.today'), 'notes', 'selDate', date),
  },
  reminders: {
    manageLogReminders:   (p = dP) => genBtn(p.t('reminders.manageLogReminders.button'), 'reminders', 'mngLogReminders', {}),
    manageDailyReminders: (p = dP) => genBtn(p.t('reminders.manageDailyReminders'), 'reminders', 'mngDailyReminders', {}),
    backToOverview:       (p = dP) => genBtn(p.t('reminders.backToOverview'), 'reminders', 'overview'),
    deleteLogReminder:    (p = dP, del) => genBtn(p.t('reminders.deleteLogReminder', { icon: p.t(`reminders.icons.${del}`), text: p.t(`reminders.logReminders.${del}`) }), 'reminders', 'mngLogReminders', { del }),
    addLogReminder:       (p = dP, add) => genBtn(p.t('reminders.addLogReminder', { icon: p.t(`reminders.icons.${add}`), text: p.t(`reminders.logReminders.${add}`)  }), 'reminders', 'mngLogReminders', { add }),
  },
  saveLogEvents: {
    yes: (savedAt, p = dP) => genBtn(p.t('generalWords.yes'), 'saveLogEvents', undefined, savedAt),
    no:  (p = dP) => genBtn(p.t('generalWords.no'), 'saveLogEvents'),
  },
  setTimezone: {
    yes: (savedAt, p = dP) => genBtn(p.t('generalWords.yes'), 'setTimezone', undefined, savedAt),
    no:  (p = dP) => genBtn(p.t('generalWords.no'), 'setTimezone'),
  }
};
