import expect from 'unexpected';
import moment from 'moment-timezone';
import delDaily from './delDaily';
import { User, Reminder } from '../../../../models';

describe('bertie callback action reminders#delDaily', () => {
  let user;
  const detectedAt = moment.utc('2013-05-13 10:00').unix();
  const originalMsg = { text: 'original message' };
  const selectedValue = 1;

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
    const reminder = await Reminder.create({ user: user.id, type: 'daily', atMinute: 1230 });
    await user.update({ latestDetectedData: { detectedAt, data: { [selectedValue]: reminder._id } } });
    user = await User.findById(user._id);
  });

  describe('with no date given', () => {
    it('the action is aborted', async () => {
      const { message } = await delDaily({ at: undefined }, user, originalMsg);

      expect(message[0], 'to equal', 'reminders.delDaily.abort');
    });
  });

  describe('with another date given than the latest detected data', () => {
    it('states that the action is old and aborts', async () => {
      const someOtherDate = moment.utc('2013-05-12').unix();
      const { message } = await delDaily({ at: someOtherDate }, user, originalMsg);

      expect(message[0], 'to equal', 'reminders.delDaily.oldData');
    });
  });

  describe('with the date given which is also the date for latest detected data', () => {
    it('deletes the selected reminder', async () => {
      const { message } = await delDaily({ n: selectedValue, at: detectedAt }, user, originalMsg);

      expect(message[0], 'to equal', 'reminders.delDaily.success');
      expect(message[1].selectedValue, 'to equal', selectedValue);
    });
  });
});
