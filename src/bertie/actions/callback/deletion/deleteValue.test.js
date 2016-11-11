import expect from 'unexpected';
import moment from 'moment-timezone';
import deleteValue from './deleteValue';
import { User, LogEvent } from '../../../../models';

describe('bertie callback action deletion#deleteValue', () => {
  let user;
  const detectedAt = moment.utc('2013-05-13 10:00').unix();
  const originalMsg = { text: 'original message' };
  const selectedValue = 1;

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
    const logEvent = await LogEvent.create({ user: user.id, createdAt: moment.utc(), category: 'sugar', originalValue: 120 });
    await user.update({ latestDetectedData: { detectedAt, data: { [selectedValue]: logEvent._id } } });
    user = await User.findById(user._id);
  });

  describe('with no date given', () => {
    it('the action is aborted', async () => {
      const { message } = await deleteValue({ at: undefined }, user, originalMsg);

      expect(message[0], 'to equal', 'deletion.deleteValue.abort');
    });
  });

  describe('with another date given than the latest detected data', () => {
    it('states that the action is old and aborts', async () => {
      const someOtherDate = moment.utc('2013-05-12').unix();
      const { message } = await deleteValue({ at: someOtherDate }, user, originalMsg);

      expect(message[0], 'to equal', 'deletion.deleteValue.oldData');
    });
  });

  describe('with the date given which is also the date for latest detected data', () => {
    it('deletes the selected logEvent', async () => {
      const { message } = await deleteValue({ n: selectedValue, at: detectedAt }, user, originalMsg);

      expect(message[0], 'to equal', 'deletion.deleteValue.success');
      expect(message[1].selectedValue, 'to equal', selectedValue);
    });
  });
});
