import expect from 'unexpected';
import manageLog from './manageLog';
import { User, Reminder } from '../../../../models';

import logReminderTypes from './logReminderTypes';
const { MORNING, AFTERNOON, EVENING } = logReminderTypes;

describe('bertie callback action reminders#manageLog', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
    await Reminder.create({ user: user.id, type: 'log', text: AFTERNOON, atMinute: 1230 });
  });

  it('returns a list of the users\' log reminders', async () => {
    const { message } = await manageLog({}, user);

    expect(message[0], 'to equal', 'reminders.manageLog.list');
    expect(message[1], 'to only have key', 'remindersList');
  });

  it('returns buttons for toggling adding and deleting reminders + a back button', async () => {
    const { buttons } = await manageLog({}, user);
    const buttonsCallbackData = buttons.map(b => JSON.parse(b[0].callback_data));

    expect(buttons.length, 'to equal', 4);
    expect(buttonsCallbackData, 'to satisfy', [
        { t: 'reminders', s: 'overview' },
        { t: 'reminders', s: 'mngLog', d: { add: MORNING } },
        { t: 'reminders', s: 'mngLog', d: { del: AFTERNOON } },
        { t: 'reminders', s: 'mngLog', d: { add: EVENING } },
    ]);
  });

  it('removes a reminder when given the parameters', async () => {
    await manageLog({ del: AFTERNOON }, user);
    const reminders = await Reminder.find({ type: 'log', user: user.id, text: AFTERNOON });

    expect(reminders, 'to be empty');
  });

  it('adds a reminder when given the parameters', async () => {
    await manageLog({ add: MORNING }, user);
    const reminders = await Reminder.find({ type: 'log', user: user.id, text: MORNING });

    expect(reminders.length, 'to equal', 1);
  });
});
