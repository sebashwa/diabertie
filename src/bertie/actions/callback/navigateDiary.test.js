import expect from 'unexpected';
import moment from 'moment-timezone';
import navigateDiary from './navigateDiary';
import { User, LogEvent } from '../../../models';

describe('bertie callback action #navigateDiary', () => {
  let user;
  const createdAt = moment.utc('2015-12-24 10:24');

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
    await LogEvent.create({ user: user.id, createdAt, category: 'sugar', unit: 'sugarMmol', value: 6.66, originalUnit: 'sugarMg', originalValue: 120 });
  });

  describe('with data available', () => {
    it('returns navigation buttons', async () => {
      const { buttons } = await navigateDiary({ d: createdAt }, user);

      expect(buttons, 'to be ok');
    });

    it('returns a message which lists data', async () => {
      const { message } = await navigateDiary({ d: createdAt }, user);

      expect(message[0], 'to equal', 'navigateDiary.data');
      expect(message[1].values, 'to be ok');
      expect(message[1].date, 'to be ok');
    });
  });

  describe('with no data available', () => {
    it('returns navigation buttons', async () => {
      const { buttons } = await navigateDiary({ d: moment.utc() }, user);

      expect(buttons, 'to be ok');
    });

    it('returns a message saying that no data is found', async () => {
      const { message } = await navigateDiary({ d: moment.utc() }, user);

      expect(message[0], 'to equal', 'navigateDiary.noData');
    });
  });
});
