import expect from 'unexpected';
import listDailyForDeletion from './listDailyForDeletion';
import { User, Reminder } from '../../../../models';

describe('bertie callback action reminders#listDailyForDeletion', () => {
  let user, reminder;

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
    reminder = await Reminder.create({ user: user.id, type: 'daily', atMinute: 1230 });
  });

  it('updates latestDetectedData on User model', async () => {
    await listDailyForDeletion({}, user);

    const { latestDetectedData } = await User.findById(user.id);

    expect(latestDetectedData.data, 'to equal', { 1: reminder.id });
  });

  it('returns buttons to delete the respective reminder + a back button', async () => {
    const { buttons } = await listDailyForDeletion({}, user);
    const buttonsCallbackData = buttons.map(b => JSON.parse(b[0].callback_data));

    expect(buttons.length, 'to equal', 2);
    expect(buttonsCallbackData, 'to satisfy', [
        { t: 'reminders', s: 'mngDaily' },
        { t: 'reminders', s: 'delDaily' }
    ]);
  });

  it('returns a message listing the reminders to delete', async () => {
    const { message } = await listDailyForDeletion({}, user);

    expect(message[0], 'to equal', 'reminders.delDaily.list');
    expect(message[1], 'to only have key', 'remindersList');
  });
});
