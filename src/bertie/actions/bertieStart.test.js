import expect from 'unexpected';
import bertieStart from './bertieStart';
import { User, Reminder } from '../../models';

describe('bertie action #bertieStart', () => {
  it('returns a success message when the user is created', async () => {
    const newId = 8167428;
    const message = await bertieStart({ id: newId, first_name: 'Mrs. Not Present' });

    expect(message, 'to equal', ['bertieStart.success', { name: 'Mrs. Not Present' }]);
  });

  it('creates an evening log reminder for new users', async () => {
    const newId = 8167428;
    await bertieStart({ id: newId, first_name: 'Mrs. Not Present' });

    const reminders = await Reminder.find({});
    const createdUser = await User.findById(reminders[0].user);

    expect(createdUser.telegramId, 'to equal', newId);
    expect(reminders[0].text, 'to equal', 'evening');
    expect(reminders[0].type, 'to equal', 'log');
  });

  it('informs the user when already present', async () => {
    const presentId = 99181;
    await User.create({ telegramId: presentId });

    const result = await bertieStart({ id: presentId, first_name: 'Mrs. Present' });

    expect(result, 'to equal', ['bertieStart.readyToGo', { name: 'Mrs. Present' }]);
  });
});
