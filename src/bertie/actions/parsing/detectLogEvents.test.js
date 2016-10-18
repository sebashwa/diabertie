import expect from 'unexpected';
import detectLogEvents from './detectLogEvents';
import polyglot from '../../polyglot';

describe('parsing action #detectLogEvents', () => {
  const p = polyglot();

  it('extracts values from the given string', async () => {
    const { data } = await detectLogEvents('120 mg 2 be 4 hum 27 lantus', p);

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
    const { data } = await detectLogEvents('120 mg 2 be 4 hum 27 lantus 12.05.2015 12:30', p);

    expect(data.date, 'to equal', { value: '12.5.2015', month: 4, date: 12, year: 2015 });
    expect(data.time, 'to equal', { value: '12:30', hours: 12, minutes: 30 });
  });

  it('generates a message from the detections', async () => {
    const { message } = await detectLogEvents('120 mg 2 be 4 hum 27 lantus', p);

    expect(message, 'to equal', ['detectLogEvents.saveConfirmation', {
      data: 'today, now:\n\n📈 120 mg/dL\n🍏 2 BE\n💉 4 Humalog, 27 Lantus'
    }]);
  });

  it('returns an error when delivering a message with no detectable values', async () => {
    const { error } = await detectLogEvents('119 bertie does not understand', p);

    expect(error, 'to equal', ['detectLogEvents.errors.notFound']);
  });

  it('returns a warning when two sugar values given', async () => {
    const { warnings } = await detectLogEvents('120 mg 7 mmol', p);

    expect(warnings[0], 'to equal', ['detectLogEvents.warnings.ambiguousSugar', {
      icon:       '📈',
      valueTexts: '120 mg/dL, 7 mmol/L'
    }]);
  });

  it('returns a warning when a date value but no time value given', async () => {
    const { warnings } = await detectLogEvents('120 mg 20.05.2015', p);

    expect(warnings[0], 'to equal', ['detectLogEvents.warnings.dateWithoutTime', { date: '20.5.2015' }]);
  });

});
