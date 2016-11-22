import expect from 'unexpected';
import knwl from '..';

describe('knwl plugin BertieValue', () => {
  const sugarUnits = [{ category: 'sugar', type: 'sugarLevel', tokens: ['mg'] }];

  it('accepts a units object and finds corresponding values', () => {
    const parser = knwl('250 mg 1 khe 6.5 humalog');
    const value = parser.get('bertieValues', sugarUnits)[0];

    expect(value, 'to equal', {
      value:    250,
      category: 'sugar',
      type:     'sugarLevel'
    });
  });

  it('works if the value occurs in the middle', () => {
    const parser = knwl('1 khe 1000 mg 6.5 humalog');
    expect(parser.get('bertieValues', sugarUnits)[0].value, 'to be', 1000);
  });

  it('works if the value occurs at the end', () => {
    const parser = knwl('1 khe 6.5 humalog 1000 mg');
    expect(parser.get('bertieValues', sugarUnits)[0].value, 'to be', 1000);
  });

  it('works with a floating point number', () => {
    const parser = knwl('8.6 mg 1 khe 6.5 humalog');
    const value = parser.get('bertieValues', sugarUnits)[0];

    expect(value.value, 'to be a', 'number');
    expect(value.value, 'to be', 8.6);
  });

  it('works with a floating point number using a comma', () => {
    const parser = knwl('8,6 mg 1 khe 6.5 humalog');
    const value = parser.get('bertieValues', sugarUnits)[0];

    expect(value.value, 'to be a', 'number');
    expect(value.value, 'to be', 8.6);
  });

  describe('when delivered several units', () => {
    const insulinUnits = [
      { category: 'therapy', type: 'bolusInsulin', tokens: ['bolus']},
      { category: 'therapy', type: 'basisInsulin', tokens: ['basis', 'basal']}
    ];

    it('delivers multiple results', () => {
      const parser = knwl('8,6 mg 6,5 bolus 27 basal 1 khe');
      const values = parser.get('bertieValues', insulinUnits);

      expect(values, 'to have length', 2);
      expect(values, 'to equal', [
        { value: 6.5, category: 'therapy', type: 'bolusInsulin' },
        { value: 27, category: 'therapy', type: 'basisInsulin' },
      ]);
    });
  });
});
