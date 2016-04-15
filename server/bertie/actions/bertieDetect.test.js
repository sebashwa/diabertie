import expect from 'unexpected';
import bertieDetect from './bertieDetect';

describe('bertie action #bertieDetect', () => {
  it('extracts values from the given string', async () => {
    const { data } = await bertieDetect('120 mg 2 be 4 hum 27 lantus');

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
    const { data } = await bertieDetect('120 mg 2 be 4 hum 27 lantus 12.05.2015 12:30');

    expect(data.date, 'to equal', { value: '12.5.2015', month: 4, date: 12, year: 2015 });
    expect(data.time, 'to equal', { value: '12:30', hours: 12, minutes: 30 });
  });

  it('generates a message from the detections', async () => {
    const { message } = await bertieDetect('120 mg 2 be 4 hum 27 lantus');

    expect(message, 'to equal', ['bertieDetect.saveConfirmation', {
      data: '*today, now:*\n\n📈 `120 sugarMg`\n🍏 `2 be`\n💉 `4 humalog`, `27 lantus`'
    }]);
  });

  it('returns an error when delivering a message with no detectable values', async () => {
    const { error } = await bertieDetect('119 bertie does not understand');

    expect(error, 'to equal', ['bertieDetect.errors.notFound']);
  });

  it('returns a warning when two sugar values given', async () => {
    const { warnings } = await bertieDetect('120 mg 7 mmol');

    expect(warnings[0], 'to equal', ['bertieDetect.warnings.ambiguousSugar', {
      valueTexts: '`120 sugarMg`, `7 sugarMmol`'
    }]);
  });

  it('returns a warning when a date value but no time value given', async () => {
    const { warnings } = await bertieDetect('120 mg 20.05.2015');

    expect(warnings[0], 'to equal', ['bertieDetect.warnings.dateWithoutTime', { date: '20.5.2015' }]);
  });

});
