import expect from 'unexpected';
import addNote from './addNote';
import { User } from '../../../../models';

describe('bertie callback action notes#addNote', () => {
  let user;
  beforeEach(async () => { user = await User.create({ telegramId: 1234567890 }); });

  it('sets latestDetectedData on the user so she can respond with a note (conversational action)', async () => {
    const dateUnixTimestamp = 124718791287;
    await addNote(dateUnixTimestamp, user, { text: 'ORIGINAL_MESSAGE' });
    const { latestDetectedData } = await User.findById(user._id);

    expect(latestDetectedData.data, 'to equal', { type: 'addNote', forDate: dateUnixTimestamp });
  });

  it('returns a message, requesting the user to enter her note', async () => {
    const { message } = await addNote(null, user, { text: 'ORIGINAL_MESSAGE' });

    expect(message[0], 'to equal', 'notes.requestNote');
  });
});
