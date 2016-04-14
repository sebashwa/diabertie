import knwl from '../knwl';
import unitsBy from '../knwl/units';

const previewTexts = (events) => events.map(e => `\`${e.value} ${e.subType || e.type}\``).join(', ');

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

  const detections = {
    values: detectedValues,
    time:   parser.get('bertieTimes')[0],
    date:   parser.get('bertieDates')[0]
  };

  const { error, warnings } = validateDetections(detections);
  if (error) return { error };

  const detectionsMsg = types.filter(type => !!detectedValues[type].length)
  .map((type) => `${previewTexts(detectedValues[type])}`)
  .join('\n');

  const message = detectionsMsg + '\n\nDo you want me to save that? (y/n)';

  return { data: detections, message, warnings };
};
