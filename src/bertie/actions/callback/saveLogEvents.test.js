import expect from 'unexpected';
import moment from 'moment-timezone';
import saveLogEvents from './saveLogEvents';
import { User } from '../../../models';

describe('bertie callback action #saveLogEvents', () => {
  let user;
  const detectedAt = moment.utc('2013-05-13 10:00').unix();
  const originalMsg = { text: 'original message' };

  beforeEach(async () => {
    user = await User.create({
      telegramId:         1234567890,
      latestDetectedData: {
        detectedAt,
        data: { values: 'some values', not: 'so important' }
      }
    });
  });

  describe('with no date given', () => {
    it('the action is aborted', async () => {
      const { message } = await saveLogEvents({ d: undefined }, user, originalMsg);

      expect(message[0], 'to equal', 'saveLogEvents.abort');
    });
  });

  describe('with another date given then the latest detected data', () => {
    it('states that the action is old and aborts', async () => {
      const someOtherDate = moment.utc('2013-05-12').unix();
      const { message } = await saveLogEvents({ d: someOtherDate }, user, originalMsg);

      expect(message[0], 'to equal', 'saveLogEvents.oldData');
    });
  });

  describe('with the date given which is also the date for latest detected data', () => {
    it('saves the log events', async () => {
      const { message } = await saveLogEvents({ d: detectedAt }, user, originalMsg);

      expect(message[0], 'to equal', 'saveLogEvents.success');
    });
  });
});
