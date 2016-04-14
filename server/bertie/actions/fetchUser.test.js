import expect from 'unexpected';
import { User } from '../../models';
import { fetchUser } from '.';

describe('bertie action #fetchUser', () => {
  const from = { id: 1234919 };
  let userInDb;
  beforeEach(async () => { userInDb = await User.create({ telegramId: from.id }); });
  afterEach(async () => await User.find().remove());

  it('returns the user if it is found', async () => {
    const { user } = await fetchUser(from);
    expect(user.id, 'to equal', userInDb.id);
  });

  it('returns an error if no user is found', async () => {
    const { error } = await fetchUser({ id: 666666 });
    expect(error, 'to contain', 'was not able to find a user');
  });

  it('returns an error if something goes wrong with the user lookup', async () => {
    const { error } = await fetchUser({ id: 'strings are no ids' });
    expect(error, 'to contain', 'Something went completely wrong');
  });
});
