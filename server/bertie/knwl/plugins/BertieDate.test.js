import expect from 'unexpected';
import moment from 'moment';
import knwl from '..';

describe('knwl plugin BertieDate', () => {
  const currentYear = moment().get('year');

  it('recognizes it with date, month and year given', () => {
    const parser = knwl('5-21-2015 5/21/2015 21.5.2015');
    const results = parser.get('bertieDates');

    results.forEach((r) => {
      expect(r, 'to equal', {
        value: '21.5.2015',
        date:  21,
        month: 4,
        year:  2015
      });
    });
  });

  it('works with only providing the last to year numbers', () => {
    const parser = knwl('6/12/13 6-12-13 12.6.13');
    const results = parser.get('bertieDates');

    results.forEach((r) => {
      expect(r, 'to equal', {
        value: '12.6.2013',
        date:  12,
        month: 5,
        year:  2013
      });
    });
  });

  it('defaults to the current year if not given', () => {
    const parser = knwl('6-12 6/12 12.6');
    const results = parser.get('bertieDates');

    results.forEach((r) => {
      expect(r, 'to equal', {
        value: `12.6.${currentYear}`,
        date:  12,
        month: 5,
        year:  currentYear
      });
    });
  });

  it('works with zero paddings', () => {

    const parser = knwl(`06-02 06/02 02.06 06-02-${currentYear} 06/02/${currentYear} 02.06.${currentYear}`);
    const results = parser.get('bertieDates');

    results.forEach((r) => {
      expect(r, 'to equal', {
        value: `2.6.${currentYear}`,
        date:  2,
        month: 5,
        year:  currentYear
      });
    });
  });
});
