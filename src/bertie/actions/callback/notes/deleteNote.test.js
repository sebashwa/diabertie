import expect from 'unexpected';
import moment from 'moment-timezone';
import deleteNote from './deleteNote';
import { User, Note } from '../../../../models';

describe('bertie callback action notes#deleteNote', () => {
  let user;
  let note;
  const detectedAt = moment().unix();

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 }); 
    note = await Note.create({ user: user.id, forDate: moment().unix(), text: 'Today I feel very dizzy' });
    await user.update({ latestDetectedData: { data: { 1: note._id }, detectedAt } });
    user = await User.findById(user.id);
  });

  describe('without detectedAt given', () => {
    it('aborts the action', async () => {
      const { message } = await deleteNote({ n: 1, at: null }, user, { text: 'some note' });
      expect(message[0], 'to equal', 'notes.deleteNote.abort');
    });
  });

  describe('with a different detectedAt given', () => {
    it('aborts the deletion, stating that it is an old request', async () => {
      const { message } = await deleteNote({ n: 1, at: moment().unix() }, user, { text: 'some note' });
      expect(message[0], 'to equal', 'notes.deleteNote.oldData');
    });
  });

  describe('with a correct detectedAt given', () => {
    it('deletes the note for the selected value', async () => {
      const { message } = await deleteNote({ n: 1, at: detectedAt }, user, { text: 'some note' });
      const refreshedNote = await Note.findById(note._id);

      expect(message[0], 'to equal', 'notes.deleteNote.success');
      expect(refreshedNote, 'not to be ok');
    });
  });
});
