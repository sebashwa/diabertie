import knwl from '../knwl';
import unitsBy from '../knwl/units';

const previewTexts = (events) => events.map(e => `\`${e.value} ${e.subType || e.type}\``).join(', ');

const buildResponseMessage = (types, {values, time, date}) => {
  const icons = { sugar: '📈', therapy: '💉', food: '🍝' };

  const dateValue = date ? [date.value] : ['today'];
  const timeValue = time ? [time.value] : ['now'];

  const dateTimeString = `*${dateValue.concat(timeValue).join(', ')}:*\n`;
  const valueStrings = types.filter(t => !!values[t].length)
                            .map((t) => `${icons[t]} ${previewTexts(values[t])}`);

  return [dateTimeString].concat(valueStrings)
                         .concat('\nDo you want me to save that?')
                         .join('\n');

};

function validateDetections({ time, date, values }) {
  const { sugar, therapy, food } = values;
  const allValues = [... sugar, ... therapy, ... food];
  const warnings = [];
  let error;

  if (allValues.length == 0) { error = 'Sorry, I didn\'t get that! To log values, please write something like:\n\n`190 mg 2 bolus 27 basal 12:30`'; };
  if (sugar.length > 1) { warnings.push(`Oops, that's strange.. I found more than one \`sugar\` value:\n\n${previewTexts(sugar)}`); }
  if (!time && date) { warnings.push(`Oops, that's strange.. I found a \`date (${date.value})\` but no \`time\`. That means I would use the current time when saving`); }

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
