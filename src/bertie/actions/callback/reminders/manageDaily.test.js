import expect from 'unexpected';
import manageDaily from './manageDaily';
import { User, Reminder } from '../../../../models';

describe('bertie callback action reminders#manageDaily', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
  });

  it('returns a list of the users\' daily reminders', async () => {
    const { message } = await manageDaily({}, user);

    expect(message[0], 'to equal', 'reminders.manageDaily.list');
    expect(message[1], 'to only have key', 'remindersList');
  });

  it('removes the latest detected data to handle coming back from adding a daily reminder', async () => {
    await manageDaily({}, user);

    const { _doc } = await User.findById(user.id);

    expect(_doc.latestDetectedData, 'to equal', { data: null, detectedAt: null });
  });

  describe('with more than zero but less than 8 reminders', () => {
    beforeEach(async () => { await Reminder.create({ user: user.id, type: 'daily', atMinute: 1230 }); });

    it('returns buttons to add and delete reminders + a back button', async () => {
      const { buttons } = await manageDaily({}, user);
      const buttonsCallbackData = buttons.map(b => JSON.parse(b[0].callback_data));

      expect(buttons.length, 'to equal', 3);
      expect(buttonsCallbackData, 'to satisfy', [
          { t: 'reminders', s: 'overview' },
          { t: 'reminders', s: 'addDaily' },
          { t: 'reminders', s: 'listForDel' },
      ]);
    });
  });

  describe('with 8 reminders present', () => {
    beforeEach(async () => {
      for(var i=0; i<8; i++) { await Reminder.create({ user: user.id, type: 'daily', atMinute: 1230 }); }
    });

    it('does not return an add button', async () => {
      const { buttons } = await manageDaily({}, user);
      const buttonsCallbackData = buttons.map(b => JSON.parse(b[0].callback_data));

      expect(buttons.length, 'to equal', 2);
      expect(buttonsCallbackData, 'to satisfy', [
          { t: 'reminders', s: 'overview' },
          { t: 'reminders', s: 'listForDel' },
      ]);
    });
  });

  describe('with no reminders present', () => {
    it('does not return a delete button', async () => {
      const { buttons } = await manageDaily({}, user);
      const buttonsCallbackData = buttons.map(b => JSON.parse(b[0].callback_data));

      expect(buttons.length, 'to equal', 2);
      expect(buttonsCallbackData, 'to satisfy', [
          { t: 'reminders', s: 'overview' },
          { t: 'reminders', s: 'addDaily' },
      ]);
    });
  });
});
