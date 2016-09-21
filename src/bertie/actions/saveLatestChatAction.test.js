import expect from 'unexpected';
import { User } from '../../models';
import { saveLatestChatAction } from '.';

describe('bertie action #saveLatestChatAction', () => {
  let user;
  beforeEach(async () => user = await User.create({ telegramId: 1234567890 }));

  it('saves the given action to the latestChatAction user field', async () => {
    await saveLatestChatAction('thatsTheType', { that: 'is the data'}, user);
    const { latestChatAction } = await User.findOne({ _id: user.id });

    expect(latestChatAction, 'to satisfy', {
      action: 'thatsTheType',
      data:   Object
    });

    expect(latestChatAction.data, 'to equal', { that: 'is the data' });
  });
});
