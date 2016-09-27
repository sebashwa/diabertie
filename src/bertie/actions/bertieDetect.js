import knwl from '../knwl';
import unitsBy from '../knwl/units';

const previewTexts = (events, p) =>
  events.map(e => `${p.t(`logEvents.${e.subType || e.type}`, e.value)}`).join(', ');

const buildResponseMessage = (types, {values, time, date}, p) => {
  const dateValue = date ? [date.value] : [p.t('dateTime.today')];
  const timeValue = time ? [time.value] : [p.t('dateTime.now')];

  const dateTimeString = `${dateValue.concat(timeValue).join(', ')}:\n`;
  const valueStrings = types.filter(t => !!values[t].length)
                            .map((t) => `${p.t(`icons.${t}`)} ${previewTexts(values[t], p)}`);

  const data = [dateTimeString].concat(valueStrings).join('\n');

  return ['bertieDetect.saveConfirmation', { data }];
};

function validateDetections({ time, date, values }, p) {
  const { sugar, therapy, food } = values;
  const allValues = [... sugar, ... therapy, ... food];
  const warnings = [];
  let error;

  if (allValues.length == 0) { error = ['bertieDetect.errors.notFound']; };
  if (sugar.length > 1) { warnings.push(['bertieDetect.warnings.ambiguousSugar', { icon: p.t('icons.sugar'), valueTexts: previewTexts(sugar, p) }]); }
  if (!time && date) { warnings.push(['bertieDetect.warnings.dateWithoutTime', { date: date.value }]); }

  return { error, warnings };
}

export default (text, polyglot) => {
  const parser = knwl(text);
  const types = ['sugar', 'food', 'therapy'];

  const detectedValues = types.reduce((prev, type) => {
    prev[type] = parser.get('bertieValues', unitsBy(type));
    return prev;
  }, {});

  const data = {
    values: detectedValues,
    time:   parser.get('bertieTimes')[0],
    date:   parser.get('bertieDates')[0]
  };

  const { error, warnings } = validateDetections(data, polyglot);
  if (error) return { error };

  const message = buildResponseMessage(types, data, polyglot);

  return { data, message, warnings };
};
