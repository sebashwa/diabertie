import expect from 'unexpected';
import { User } from '../../models';
import { saveLatestChatAction } from '.';

describe('bertie action #saveLatestChatAction', () => {
  const from = { id: 12345 };
  beforeEach(() => User.create({ telegramId: from.id }));

  it('saves the given action to the latestChatAction user field', async () => {
    await saveLatestChatAction('thatsTheType', { that: 'is the data'}, from);
    const { latestChatAction } = await User.findOne({ telegramId: from.id });

    expect(latestChatAction, 'to satisfy', {
      action: 'thatsTheType',
      data:   Object
    });

    expect(latestChatAction.data, 'to equal', { that: 'is the data' });
  });

  it('returns an error if the user is not found', async () => {
    const { error } = await saveLatestChatAction('thatsTheType', { and: 'the data'}, { id: 66666 });

    expect(error, 'to contain', 'not able to find a user');
  });
});
