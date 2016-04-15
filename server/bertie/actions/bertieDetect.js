import knwl from '../knwl';
import unitsBy from '../knwl/units';

const previewTexts = (events) => events.map(e => `\`${e.value} ${e.subType || e.type}\``).join(', ');

const buildResponseMessage = (types, {values, time, date}) => {
  const icons = { sugar: '📈', therapy: '💉', food: '🍏' };

  const dateValue = date ? [date.value] : ['today'];
  const timeValue = time ? [time.value] : ['now'];

  const dateTimeString = `*${dateValue.concat(timeValue).join(', ')}:*\n`;
  const valueStrings = types.filter(t => !!values[t].length)
                            .map((t) => `${icons[t]} ${previewTexts(values[t])}`);

  const data = [dateTimeString].concat(valueStrings).join('\n');

  return ['bertieDetect.saveConfirmation', { data }];
};

function validateDetections({ time, date, values }) {
  const { sugar, therapy, food } = values;
  const allValues = [... sugar, ... therapy, ... food];
  const warnings = [];
  let error;

  if (allValues.length == 0) { error = ['bertieDetect.errors.notFound']; };
  if (sugar.length > 1) { warnings.push(['bertieDetect.warnings.ambiguousSugar', { valueTexts: previewTexts(sugar) }]); }
  if (!time && date) { warnings.push(['bertieDetect.warnings.dateWithoutTime', { date: date.value }]); }

  return { error, warnings };
}

export default (text) => {
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

  const { error, warnings } = validateDetections(data);
  if (error) return { error };

  const message = buildResponseMessage(types, data);

  return { data, message, warnings };
};
