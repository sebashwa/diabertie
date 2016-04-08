import expect from 'unexpected';
import knwl from '..';

describe('knwl plugin BertieTime', () => {
  it('recognizes time by the colon sign', () => {
    const parser = knwl('250 mg 12:30 1 humalog');
    const values = parser.get('bertieTimes');

    expect(values, 'to have length', 1);
    expect(values[0], 'to equal', {
      value:   '12:30',
      hours:   12,
      minutes: 30
    });
  });

  context('when dealing with the 12-hour clock', () => {
    it('understands PM times', () => {
      const parser = knwl('250 mg 4:30:12 pm');
      const value = parser.get('bertieTimes')[0];

      expect(value, 'to equal', {
        value:   '4:30 pm',
        hours:   16,
        minutes: 30
      });
    });

    it('understands AM times', () => {
      const parser = knwl('250 mg 2:18:11 am');
      const value = parser.get('bertieTimes')[0];

      expect(value, 'to equal', {
        value:   '2:18 am',
        hours:   2,
        minutes: 18
      });
    });

  });
});
