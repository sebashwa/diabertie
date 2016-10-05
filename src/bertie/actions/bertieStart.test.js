import expect from 'unexpected';
import bertieStart from './bertieStart';
import { User } from '../../models';

describe('bertie action #bertieStart', () => {
  it('returns a success message when the user is created', async () => {
  });

  it('informs the user when already present', async () => {
    const presentId = 99181;
    await User.create({ telegramId: presentId });

    const result = await bertieStart({ id: presentId, first_name: 'Mrs. Present' });

    expect(result, 'to equal', ['bertieStart.readyToGo', { name: 'Mrs. Present' }]);
  });
});
