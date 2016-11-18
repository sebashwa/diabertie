import expect from 'unexpected';
import addDailyReminder from './addDailyReminder';
import { User, Reminder } from '../../../models';

describe('conversational action #addDailyReminder', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      telegramId: 123456789,
      timezone:   'Europe/Berlin',
    });
  });

  it('adds a daily reminder with the given time and text', async () => {
    await addDailyReminder('12:00 measure your sugar level', user);
    const reminders = await Reminder.find({ user });

    const utcTwelveOclock = 11 * 60;
    expect(reminders[0].text, 'to equal', 'measure your sugar level');
    expect(reminders[0].atMinute, 'to equal', utcTwelveOclock);
  });

  it('returns a success message with the zero padded reminder time', async () => {
    const { message } = await addDailyReminder('2:00 WAKE UP', user);

    expect(message, 'to equal', ['reminders.addDaily.success', {
      hours:       '02',
      minutes:     '00',
      description: '- WAKE UP',
    }]);
  });

  it('returns a button to manage daily reminders after adding', async () => {
    const { buttons } = await addDailyReminder('2:00 WAKE UP', user);
    const callbackData = JSON.parse(buttons[0][0].callback_data);

    expect(callbackData, 'to equal', { t: 'reminders', s: 'mngDaily', d: {} });
  });

  it('returns a failure message if the given format is wrong', async () => {
    const { message } = await addDailyReminder('REMINDER WITHOUT TIME LULZ', user);

    expect(message, 'to equal', ['reminders.addDaily.regExFailure']);
  });

  it('returns a failure message if something goes super wrong', async () => {
    const { message } = await addDailyReminder('12:00 remind me', { not: 'a user' });

    expect(message, 'to equal', ['generalErrors.superWrong']);
  });
});
