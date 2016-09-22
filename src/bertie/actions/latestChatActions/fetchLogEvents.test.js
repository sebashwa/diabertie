import expect from 'unexpected';
// import fetchLogEvents from './fetchLogEvents';
import { User, LogEvent } from '../../../models';

describe.skip('bertie action #fetchLogEvents', () => {
  let user;
  const createLogEventBatch = async (date) => {
    await LogEvent.create({ user: user.id, createdAt: date, category: 'sugar', unit: 'sugarMmol', value: 6.66, originalUnit: 'sugarMg', originalValue: 120 });
    await LogEvent.create({ user: user.id, createdAt: date, category: 'therapy', unit: 'bolusInsulin', value: 4, originalUnit: 'humalog', originalValue: 4 });
    await LogEvent.create({ user: user.id, createdAt: date, category: 'food', unit: 'carbs', value: 24, originalUnit: 'be', originalValue: 2 });
  };

  beforeEach(async () => {
    user = await User.create({
      telegramId: 1234567890,
      timezone:   'Europe/Berlin',
    });

    const breakfastTime = new Date('2015-04-11T08:30:21.749Z');
    await createLogEventBatch(breakfastTime);
    const lunchTime = new Date('2015-04-11T12:43:41.749Z');
    await createLogEventBatch(lunchTime);
  });

  it('fetches the log events of a given date', async () => {
    const { message } = { message: 'foobar' }; // await fetchLogEvents(new Date('2015-04-11'), user);

    expect(message, 'to equal', ['8:30\n120 mg/dL, 2 BE, 4 Humalog\n\n12:45\n120 mg/dL, 2 BE, 4 Humalog']);
  });
});
