import expect from 'unexpected';
import { User, LogEvent } from '../../models';
import { executeLatestChatAction } from '.';

describe('bertie action #executeLatestChatAction', () => {
  let user;

  beforeEach(async () =>
    user = await User.create({
      email:            'user@example.com',
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
    await executeLatestChatAction(user);
    const events = await LogEvent.find({});

    expect(events[0].value, 'to equal', 120);
  });

  it('deletes the latest chat action from the user after executing it', async () => {
    await executeLatestChatAction(user);
    const { latestChatAction } = await User.findOne({ _id: user.id });

    expect(latestChatAction.action, 'to be', null);

  });

  it('returns the message returned by the latest chat action', async () => {
    const { message } = await executeLatestChatAction(user);

    expect(message, 'to equal', ['latestChatActions.saveLogEvents.success']);
  });
});
