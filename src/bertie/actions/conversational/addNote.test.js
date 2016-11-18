import expect from 'unexpected';
import moment from 'moment-timezone';
import addNote from './addNote';
import { User, Note } from '../../../models';

describe('conversational action #addNote', () => {
  let user;
  const forDate = 1479460291;

  beforeEach(async () => {
    user = await User.create({
      telegramId:         123456789,
      timezone:           'Europe/Berlin',
      latestDetectedData: { data: { forDate } }
    });
  });

  it('adds a note with the given text and the date saved on the user', async () => {
    await addNote('This day is very stressful', user);
    const notes = await Note.find({ user });
    const at = moment.tz(notes[0].forDate, user.timezone).tz('etc_utc').unix();

    expect(notes[0].text, 'to equal', 'This day is very stressful');
    expect(at, 'to equal', forDate);
  });

  it('deletes the latestDetectedData on the user', async () => {
    await addNote('This day is very stressful', user);
    const { _doc } = await User.findById(user.id);

    expect(_doc.latestDetectedData, 'to equal', { data: null, detectedAt: null });
  });

  it('returns a message stating that the note was added', async () => {
    const { message } = await addNote('text', user);

    expect(message, 'to equal', ['notes.added']);
  });

  it('returns a message if something goes super wrong', async () => {
    const { message } = await addNote('text', { not: 'a user' });

    expect(message, 'to equal', ['generalErrors.superWrong']);
  });
});
