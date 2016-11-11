import expect from 'unexpected';
import addDaily from './addDaily';
import { User } from '../../../../models';

describe('bertie callback action reminders#addDaily', () => {
  let user;
  beforeEach(async () => { user = await User.create({ telegramId: 1234567890 }); });

  it('returns a message to explain the user how to add the reminder', async () => {
    const { message } = await addDaily({}, user);
    expect(message[0], 'to equal', 'reminders.addDaily.explanation');
  });

  it('saves latestDetectedData on user for her to be able add reminder in a conversational action', async () => {
    await addDaily({}, user);
    const { latestDetectedData } = await User.findById(user.id);
    expect(latestDetectedData.data.type, 'to equal', 'addDailyReminder');
  });

  it('returns a back button so the user can navigate back', async () => {
    const { buttons } = await addDaily({}, user);
    const backButtonData = JSON.parse(buttons[0][0].callback_data);

    expect(backButtonData, 'to equal', { t: 'reminders', s: 'mngDaily' });
  });
});
