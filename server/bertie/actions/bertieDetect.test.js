import expect from 'unexpected';
import { User } from '../../models';
import bertieDetect from './bertieDetect';

describe('bertie action #bertieDetect', () => {
  const from = { id: 12345 };
  beforeEach(() => User.create({ telegramId: from.id }));

  it('extracts values from the given string', async () => {
    const { data } = await bertieDetect({ text: '120 mg 2 be 4 hum 27 lantus', from });

    expect(data.values, 'to equal', {
      sugar: [
        { value: 120, category: 'sugar', type: 'sugarMmol', subType: 'sugarMg', factor: 0.0555 }
      ],
      therapy: [
        { value: 4, category: 'therapy', type: 'bolusInsulin', subType: 'humalog', factor: null},
        { value: 27, category: 'therapy', type: 'basisInsulin', subType: 'lantus', factor: null}
      ],
      food: [{ value: 2, category: 'food', type: 'carbs', subType: 'be', factor: 12 }]
    });
  });

  it('extracts date and time from the given string', async () => {
    const { data } = await bertieDetect({ text: '120 mg 2 be 4 hum 27 lantus 12.05.2015 12:30', from });

    expect(data.date, 'to equal', { value: '12.5.2015', month: 4, date: 12, year: 2015 });
    expect(data.time, 'to equal', { value: '12:30', hours: 12, minutes: 30 });
  });

  it('generates a message from the detections', async () => {
    const { messages } = await bertieDetect({ text: '120 mg 2 be 4 hum 27 lantus', from });

    expect(messages[0], 'to equal', '`120 sugarMg`\n`2 be`\n`4 humalog`, `27 lantus`');
  });

  it('generates a confirmation message', async () => {
    const { messages } = await bertieDetect({text: '120 mg 2 be 4 hum 27 lantus', from });

    expect(messages[1], 'to contain', 'save that?');
  });

  it('returns an error when delivering a message with no detectable values', async () => {
    const { errors } = await bertieDetect({ text: '119 bertie does not understand', from });

    expect(errors[0], 'to contain', 'Sorry, I didn\'t get that');
  });

  it('returns a warning when two sugar values given', async () => {
    const { warnings } = await bertieDetect({ text: '120 mg 7 mmol', from });

    expect(warnings[0], 'to contain', 'I found more than one `sugar` value');
  });

  it('returns a warning when a date value but no time value given', async () => {
    const { warnings } = await bertieDetect({ text: '120 mg 20.05.2015', from });

    expect(warnings[0], 'to contain', 'I found a `date (20.5.2015)` but no `time`');
  });

  it('saves the detections in the last chat action field of the user', async () => {
    await bertieDetect({ text: '120 mg', from });
    const { latestChatAction } = await User.findOne({ telegramId: from.id });

    expect(latestChatAction, 'to satisfy', {
      action: 'saveLogEvents',
      data:   Object
    });

    expect(latestChatAction.action, 'to equal', 'saveLogEvents');
    expect(latestChatAction.data.values.sugar[0].value, 'to equal', 120);
  });
});
