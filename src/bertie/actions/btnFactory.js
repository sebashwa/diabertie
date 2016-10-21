import polyglot from '../polyglot';

const generateButton = (text, { type, subType, data }) => {
  return { text, callback_data: JSON.stringify({ type, subType, data }) };
};

const navigateDiary = (text, data) => generateButton(text, { type: 'navigateDiary', data });
const deletion = (text, data, subType) => generateButton(text, { type: 'deletion', subType, data });
const saveLogEvents = (text, data) => generateButton(text, { type: 'saveLogEvents', data });

export default {
  navigateDiary: {
    back:    (date) => navigateDiary('<<', date),
    forward: (date) => navigateDiary('>>', date),
    today:   (date, p = polyglot()) => navigateDiary(p.t('dateTime.today'), date),
  },
  deletion: {
    select:  (date, p = polyglot()) => deletion(p.t('deletion.select'), date, 'selectValue'),
    back:    (date) => deletion('<<', date, 'selectDate'),
    forward: (date) => deletion('>>', date, 'selectDate'),
    today:   (date, p = polyglot()) => deletion(p.t('dateTime.today'), date, 'selectDate'),
  },
  saveLogEvents: {
    yes: (savedAt, p = polyglot()) => saveLogEvents(p.t('saveLogEvents.yes'), savedAt),
    no:  (p = polyglot()) => saveLogEvents(p.t('saveLogEvents.no')),
  }
};
