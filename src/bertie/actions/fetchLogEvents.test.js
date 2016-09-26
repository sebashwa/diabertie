import expect from 'unexpected';
import moment from 'moment-timezone';
import fetchLogEvents from './fetchLogEvents';
import { User, LogEvent } from '../../models';

describe('bertie action #fetchLogEvents', () => {
  let user;
  const createLogEventBatch = async (date) => {
    await LogEvent.create({ user: user.id, createdAt: date, category: 'sugar', unit: 'sugarMmol', value: 6.66, originalUnit: 'sugarMg', originalValue: 120 });
    await LogEvent.create({ user: user.id, createdAt: date, category: 'food', unit: 'carbs', value: 24, originalUnit: 'be', originalValue: 2 });
    await LogEvent.create({ user: user.id, createdAt: date, category: 'therapy', unit: 'bolusInsulin', value: 4, originalUnit: 'humalog', originalValue: 4 });
  };

  beforeEach(async () => {
    user = await User.create({
      telegramId: 1234567890,
      timezone:   'Europe/Berlin',
    });

    const breakfastTime = moment.utc('2015-04-11 07:32');
    await createLogEventBatch(breakfastTime);
    const lunchTime = moment.utc('2015-04-11 10:43');
    await createLogEventBatch(lunchTime);
  });

  it('fetches the log events of a given date', async () => {
    const { message } = await fetchLogEvents(user, moment('2015-04-11'));

    expect(message, 'to equal', '*09:30* - 📈 120 🍏 2 💉 4\n*12:40* - 📈 120 🍏 2 💉 4');
  });
});
