import expect from 'unexpected';
import { User, LogEvent } from '../../models';
import { executeLatestChatAction } from '.';

describe('bertie action #executeLatestChatAction', () => {
  const from = { id: 12345 };

  beforeEach(() =>
    User.create({
      telegramId:       from.id,
      latestChatAction: {
        action: 'saveLogEvents',
        data:   {
          values: [
            {category: 'sugar', value: 120}
          ]
        }
      }
    })
  );

  it('executes the latest chat action saved on the user', async () => {
    await executeLatestChatAction(from);
    const events = await LogEvent.find({});

    expect(events[0].value, 'to equal', 120);
  });

  it('deletes the latest chat action from the user after executing it', async () => {
    await executeLatestChatAction(from);
    const user = await User.findOne({ telegramId: from.id });

    expect(user.latestChatAction.action, 'to be', null);

  });

  it('returns the message returned by the latest chat action', async () => {
    const { message } = await executeLatestChatAction(from);

    expect(message, 'to contain', 'saved your data');
  });

  it('returns an error when the user is not found', async () => {
    const { error } = await executeLatestChatAction({ id: 6666 });

    expect(error, 'to contain', 'was not able to find a user');
  });
});
