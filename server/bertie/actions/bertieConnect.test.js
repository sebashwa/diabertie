/* eslint-disable camelcase */

import expect from 'unexpected';
import bertieConnect from './bertieConnect';
import { User } from '../../models';

describe('bertie action #bertieConnect', () => {
  const userToken = 'PRESENT';
  let user;

  beforeEach(async () => (
    user = await User.create({
      email:         'present@user',
      telegramId:    null,
      telegramToken: userToken
    })
  ));

  it('updates the telegramId on the user', async () => {
    await bertieConnect(userToken, { id: 1234 });
    const user = await User.findOne({ telegramToken: userToken });

    expect(user, 'to have property', 'telegramId', 1234);
  });

  it('returns a success message', async () => {
    const result = await bertieConnect(userToken, { id: 1234, first_name: 'Present' });

    expect(result, 'to equal', ['bertieConnect.success', { name: 'Present', email: 'present@user' }]);
  });

  it('returns a "not found" text if no user is found', async () => {
    const result = await bertieConnect('NOT_PRESENT', { id: 10000 });

    expect(result, 'to equal', ['generalErrors.userNotFound']);
  });

  it('informs the user when already connected with the same account', async () => {
    const presentId = 99181;
    await user.update({ telegramId: presentId });

    const result = await bertieConnect(userToken, { id: presentId });

    expect(result, 'to equal', ['bertieConnect.readyToGo', { email: 'present@user' }]);
  });

  it('informs the user when already connected with another account', async () => {
    const alreadyConnectedId = 16661;
    const alreadyConnectedUserProps = {
      email:      'already@connected',
      telegramId: alreadyConnectedId
    };

    await User.create(alreadyConnectedUserProps);
    const result = await bertieConnect(userToken, { id: alreadyConnectedId });

    expect(result, 'to equal', ['bertieConnect.alreadyConnected', { email: 'already@connected' }]);
  });
});
