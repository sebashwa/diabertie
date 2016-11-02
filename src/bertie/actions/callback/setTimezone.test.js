import expect from 'unexpected';
import setTimezone from './setTimezone';
import { User } from '../../../models';

describe('bertie callback action #setTimezone', () => {
  let user;
  beforeEach(async () => { user = await User.create({ telegramId: 1234567890 }); });

  describe('with data given', () => {
    it('sets latestDetectedData on the user so she can respond with a location (conversational action)', async () => {
      await setTimezone({ d: true }, user);
      const { latestDetectedData } = await User.findById(user._id);

      expect(latestDetectedData.data, 'to equal', { type: 'setTimezone' });
    });

    it('returns a message, asking the user to respond with a location', async () => {
      const { message } = await setTimezone({ d: true }, user);
      expect(message, 'to equal', ['setTimezone.requestLocation', { timezone: user.timezone }]);
    });
  });

  describe('with no data given', () => {
    it('keeps the old timezone (noop) and returns a message', async () => {
      const { message } = await setTimezone({ d: null }, user);
      expect(message, 'to equal', ['setTimezone.notSet', { timezone: user.timezone }]);
    });
  });
});
