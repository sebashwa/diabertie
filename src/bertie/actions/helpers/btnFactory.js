import polyglot from '../../polyglot';

const generateButton = (text, { type, subType, data }) => {
  return { text, callback_data: JSON.stringify({ t: type, s: subType, d: data }) };
};

const navigateDiary = (text, data) => generateButton(text, { type: 'navigateDiary', data });
const deletion = (text, data, subType) => generateButton(text, { type: 'del', subType, data });
const saveLogEvents = (text, data) => generateButton(text, { type: 'saveLogEvents', data });

export default {
  navigateDiary: {
    back:    (date) => navigateDiary('<<', date),
    forward: (date) => navigateDiary('>>', date),
    today:   (date, p = polyglot()) => navigateDiary(p.t('dateTime.today'), date),
  },
  deletion: {
    process: (n, at) => deletion(`${n})`, { n, at } , 'delVal'),
    select:  (date, p = polyglot()) => deletion(p.t('deletion.select'), date, 'selVal'),
    back:    (date) => deletion('<<', date, 'selDate'),
    forward: (date) => deletion('>>', date, 'selDate'),
    today:   (date, p = polyglot()) => deletion(p.t('dateTime.today'), date, 'selDate'),
  },
  saveLogEvents: {
    yes: (savedAt, p = polyglot()) => saveLogEvents(p.t('saveLogEvents.yes'), savedAt),
    no:  (p = polyglot()) => saveLogEvents(p.t('saveLogEvents.no')),
  }
};
