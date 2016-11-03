import polyglot from '../../polyglot';

const generateButton = (text, { type, subType, data }) => {
  return { text, callback_data: JSON.stringify({ t: type, s: subType, d: data }) };
};

const navigateDiary = (text, data) => generateButton(text, { type: 'navigateDiary', data });
const deletion = (text, data, subType) => generateButton(text, { type: 'del', subType, data });
const notes = (text, data, subType) => generateButton(text, { type: 'notes', subType, data });
const saveLogEvents = (text, data) => generateButton(text, { type: 'saveLogEvents', data });
const setTimezone = (text, data) => generateButton(text, { type: 'setTimezone', data });

export default {
  navigateDiary: {
    back:    (date) => navigateDiary('<<', date),
    forward: (date) => navigateDiary('>>', date),
    today:   (date, p = polyglot()) => navigateDiary(p.t('dateTime.today'), date),
  },
  deletion: {
    process: (n, at) => deletion(`${n})`, { n, at } , 'delVal'),
    select:  (date, p = polyglot()) => deletion(p.t('generalWords.select'), date, 'selVal'),
    back:    (date) => deletion('<<', date, 'selDate'),
    forward: (date) => deletion('>>', date, 'selDate'),
    today:   (date, p = polyglot()) => deletion(p.t('dateTime.today'), date, 'selDate'),
  },
  notes: {
    addNote: (date, p = polyglot()) => notes(p.t('notes.addNote'), date, 'addNote'),
    delNote: (date, p = polyglot()) => notes(p.t('notes.delNote'), date, 'selNote'),
    delete:  (n, at) => notes(`${n})`, { n, at }, 'delNote'),
    back:    (date) => notes('<<', date, 'selDate'),
    forward: (date) => notes('>>', date, 'selDate'),
    today:   (date, p = polyglot()) => notes(p.t('dateTime.today'), date, 'selDate'),
  },
  saveLogEvents: {
    yes: (savedAt, p = polyglot()) => saveLogEvents(p.t('generalWords.yes'), savedAt),
    no:  (p = polyglot()) => saveLogEvents(p.t('generalWords.no')),
  },
  setTimezone: {
    yes: (savedAt, p = polyglot()) => setTimezone(p.t('generalWords.yes'), savedAt),
    no:  (p = polyglot()) => setTimezone(p.t('generalWords.no')),
  }
};
