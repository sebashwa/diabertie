import expect from 'unexpected';
import moment from 'moment-timezone';
import fetchLogEvents from './fetchLogEvents';
import { User, LogEvent } from '../../../models';

describe('bertie action #fetchLogEvents', () => {
  let user;
  let breakfastIds;
  let lunchIds;

  const createLogEventBatch = async (date) => {
   const { _doc: doc1 } = await LogEvent.create({ user: user.id, createdAt: date, category: 'sugar', unit: 'sugarMmol', value: 6.66, originalUnit: 'sugarMg', originalValue: 120 });
   const { _doc: doc2 } = await LogEvent.create({ user: user.id, createdAt: date, category: 'food', unit: 'carbs', value: 24, originalUnit: 'be', originalValue: 2 });
   const { _doc: doc3 } = await LogEvent.create({ user: user.id, createdAt: date, category: 'therapy', unit: 'bolusInsulin', value: 4, originalUnit: 'humalog', originalValue: 4 });

   return [doc1._id, doc2._id, doc3._id];
  };

  beforeEach(async () => {
    user = await User.create({
      telegramId: 1234567890,
      timezone:   'Europe/Berlin',
    });

    const breakfastTime = moment.utc('2015-04-11 07:32');
    breakfastIds = await createLogEventBatch(breakfastTime);

    const lunchTime = moment.utc('2015-04-11 10:43');
    lunchIds = await createLogEventBatch(lunchTime);
  });

  it('fetches the log events of a given date', async () => {
    const { data } = await fetchLogEvents(user, moment('2015-04-11'));
    const logEventIds = data.reduce((p, c) => (p.concat(c.logEvents)), []).map(d => d._id);

    expect(logEventIds, 'to equal', breakfastIds.concat(lunchIds));
  });

  it('returns empty array if no data is available' , async () => {
    const { data } = await fetchLogEvents(user, moment('2015-04-12'));

    expect(data, 'to equal', []);
  });
});
